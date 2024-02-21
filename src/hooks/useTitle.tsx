export default function useTitle(title: string) {
  if (typeof window !== 'undefined' && title !== document.title)
    document.title = title
}
