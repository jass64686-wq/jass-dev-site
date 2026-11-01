export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gradient">{`// ${eyebrow}`}</p>
      <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
