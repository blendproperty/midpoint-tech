export function RichText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose-content space-y-5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-soft)]">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
