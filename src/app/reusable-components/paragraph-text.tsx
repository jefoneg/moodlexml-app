export function Paragraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
    return <p className={`text-sm md:text-lg ${className}`}>{text}</p>
}
