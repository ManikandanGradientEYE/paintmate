export default function Card({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`rounded-2xl border border-line bg-white p-5 md:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
