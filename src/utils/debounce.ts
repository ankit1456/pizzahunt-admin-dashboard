export default function debounce<T extends (...args: never[]) => void>(
  cb: T,
  delay = 1000
): (...args: Parameters<T>) => void {
  let timer: number;

  return function (this: unknown, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => cb.apply(this, args), delay);
  };
}
