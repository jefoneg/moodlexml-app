export function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <h1 className={`font-bold text-xl md:text-3xl ${className}`}>{text}</h1>;
}
