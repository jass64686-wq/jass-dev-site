import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 42,
          backgroundColor: '#170d48',
        }}
      >
        <svg width="132" height="132" viewBox="0 0 180 180">
          <path
            d="M92 32h30v79c0 27-17 42-45 42-22 0-38-10-50-28l24-18c7 11 15 16 25 16 11 0 16-6 16-19V32Z"
            fill="#ec4899"
          />
        </svg>
      </div>
    ),
    size,
  )
}
