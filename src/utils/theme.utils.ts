export function cn(...inputs: Array<string | number | false | null | undefined>) {
  // Simple implementation of clsx
  const classNames = inputs
    .flat()
    .filter(Boolean)
    .join(" ");

  // Simple implementation of tailwind-merge (no-op)
  return classNames;
}
