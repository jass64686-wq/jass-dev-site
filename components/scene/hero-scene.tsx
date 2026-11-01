'use client'

import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'

const HUD_COLORS = ['#4625eb', '#170d48', '#7c3aed', '#ea580c']
const START_COLOR_INDEX = 1 // purple (#170d48)

type ArcRing = {
  radius: number
  width: number
  arcs: [number, number][]
  speed: number
  tilt: [number, number, number]
  opacity: number
  tone?: string
}

const RINGS: ArcRing[] = [
  {
    radius: 1.35,
    width: 0.12,
    arcs: [[0, 1.2], [1.5, 0.9], [2.7, 1.8], [4.8, 1.1]],
    speed: -0.5,
    tilt: [0, 0, 0],
    opacity: 0.55,
  },
  {
    radius: 1.95,
    width: 0.06,
    arcs: [[0.3, 0.5], [1.1, 0.5], [1.9, 0.5], [3.4, 1.6], [5.4, 0.5]],
    speed: 0.35,
    tilt: [0, 0, 0],
    opacity: 0.7,
  },
]

function SegmentedRing({ radius, width, arcs, speed, tilt, opacity, tone, color, boost }: ArcRing & { color: string; boost: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed * (1 + boost * 4)
  })
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        {arcs.map(([start, length], i) => (
          <mesh key={i}>
            <ringGeometry args={[radius, radius + width, 96, 1, start, length]} />
            <meshBasicMaterial color={tone ?? color} transparent opacity={opacity} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function TickRing({ radius, count, color }: { radius: number; count: number; color: string }) {
  const ref = useRef<THREE.LineSegments>(null)
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const len = i % 5 === 0 ? 0.16 : 0.07
      positions.set(
        [Math.cos(a) * radius, Math.sin(a) * radius, 0, Math.cos(a) * (radius + len), Math.sin(a) * (radius + len), 0],
        i * 6,
      )
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [radius, count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * 0.08
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.6} toneMapped={false} />
    </lineSegments>
  )
}

function ArcReactor({ position }: { position: [number, number, number] }) {
  const { viewport } = useThree()
  const isNarrow = viewport.width < 8
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const shell = useRef<THREE.Mesh>(null)
  const rotationTarget = useRef(new THREE.Euler(-0.25, -0.45, 0))
  const dragging = useRef(false)
  const moved = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const pulse = useRef(0)
  const [colorIndex, setColorIndex] = useState(START_COLOR_INDEX)
  const [hovered, setHovered] = useState(false)
  const [boost, setBoost] = useState(0)
  const color = HUD_COLORS[colorIndex]

  useFrame((state, delta) => {
    if (!group.current || !core.current || !shell.current) return
    const t = state.clock.elapsedTime
    if (!dragging.current) rotationTarget.current.y += delta * 0.12
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, rotationTarget.current.x, 6, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, rotationTarget.current.y, 6, delta)

    pulse.current = THREE.MathUtils.damp(pulse.current, 0, 2.5, delta)
    const beat = 1 + Math.sin(t * 3) * 0.04 + pulse.current * 0.35
    core.current.scale.setScalar(beat * (hovered ? 1.08 : 1))
    shell.current.rotation.x += delta * 0.4
    shell.current.rotation.y += delta * 0.6
    const nextBoost = pulse.current > 0.05 ? pulse.current : 0
    if (Math.abs(nextBoost - boost) > 0.05) setBoost(nextBoost)
  })

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    ;(e.target as unknown as Element).setPointerCapture(e.pointerId)
    dragging.current = true
    moved.current = false
    last.current = { x: e.clientX, y: e.clientY }
    document.body.style.cursor = 'grabbing'
  }

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return
    e.stopPropagation()
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true
    rotationTarget.current.y += dx * 0.01
    rotationTarget.current.x = THREE.MathUtils.clamp(rotationTarget.current.x + dy * 0.01, -1.2, 1.2)
    last.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    ;(e.target as unknown as Element).releasePointerCapture(e.pointerId)
    dragging.current = false
    document.body.style.cursor = hovered ? 'grab' : 'auto'
    if (!moved.current) {
      pulse.current = 1
      setColorIndex((c) => (c + 1) % HUD_COLORS.length)
    }
  }

  return (
    <group position={position}>
      <group ref={group}>
        <mesh
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            if (!dragging.current) document.body.style.cursor = 'grab'
          }}
          onPointerOut={() => {
            setHovered(false)
            if (!dragging.current) document.body.style.cursor = 'auto'
          }}
        >
          <sphereGeometry args={[2.6, 24, 24]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        <mesh ref={core}>
          <sphereGeometry args={[0.34, 64, 64]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.2}
            roughness={0.05}
            metalness={0.2}
            clearcoat={1}
            toneMapped={false}
          />
        </mesh>

        <mesh ref={shell}>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={isNarrow ? 0.14 : 0.28}
            toneMapped={false}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[1.6, isNarrow ? 18 : 28, isNarrow ? 12 : 18]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={isNarrow ? 0.035 : 0.08}
            toneMapped={false}
          />
        </mesh>

        {RINGS.map((ring, i) => (
          <SegmentedRing key={i} {...ring} color={color} boost={boost} />
        ))}
        <TickRing radius={2.08} count={90} color={color} />
      </group>
    </group>
  )
}

function HoloGrid() {
  const grid = useMemo(() => {
    const helper = new THREE.PolarGridHelper(9, 16, 8, 96, '#255a68', '#115c6e')
    const material = helper.material as THREE.LineBasicMaterial
    material.transparent = true
    material.opacity = 0.18
    return helper
  }, [])
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03
  })
  return (
    <group ref={ref} position={[0, -4.3, -2]}>
      <primitive object={grid} />
    </group>
  )
}

const PARTICLE_COLORS = HUD_COLORS.slice(0, 3)

function DataParticles({ count = 1200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  const isNarrow = viewport.width < 8

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = PARTICLE_COLORS.map((c) => new THREE.Color(c))
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = r * Math.cos(phi) - 4
      const c = palette[i % palette.length]
      colors.set([c.r, c.g, c.b], i * 3)
    }
    return { positions, colors }
  }, [count])

  const dotTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 64
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.9)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((state, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.03
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, state.pointer.y * 0.15, 0.05)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isNarrow ? 0.05 : 0.07}
        map={dotTexture}
        alphaTest={0.01}
        vertexColors
        transparent
        opacity={isNarrow ? 0.35 : 0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, 0.04)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.04)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function ScrollGlobe({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame((_, delta) => {
    if (!ref.current) return

    // 0 at the top of the page, 1 after scrolling ~80% of one screen height
    const raw = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)))
    const p = raw * raw * (3 - 2 * raw) // smoothstep easing

    const isNarrow = viewport.width < 8
    const startX = isNarrow ? 0 : 2.7 // right side on desktop
    const startY = isNarrow ? 0 : 0.2

    const targetX = THREE.MathUtils.lerp(startX, 0, p)
    const targetY = THREE.MathUtils.lerp(startY, 0, p)

    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, targetX, 4, delta)
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 4, delta)
  })

  return <group ref={ref}>{children}</group>
}

function ResponsiveGroup({ children }: { children: ReactNode }) {
  const { viewport } = useThree()
  const isNarrow = viewport.width < 8
  const s = isNarrow ? Math.max(0.4, viewport.width / 9) : 1
  return (
    <group scale={s} position={isNarrow ? [0, -viewport.height * 0.3, -1] : [0, 0, 0]}>
      {children}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      aria-label="Interactive holographic core. Drag it to rotate, click it to pulse and change color."
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 4]} intensity={30} color="#22d3ee" />

      <ResponsiveGroup>
        <ScrollGlobe>
          <ArcReactor position={[0, 0, 0]} />
        </ScrollGlobe>
      </ResponsiveGroup>

      <HoloGrid />
      <DataParticles />

      <hemisphereLight args={['#ffffff', '#0e7490', 0.8]} />
      <directionalLight position={[0, 5, -5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[6, 1, 1]} intensity={1.8} color="#a5f3fc" />

      <CameraRig />
    </Canvas>
  )
}
