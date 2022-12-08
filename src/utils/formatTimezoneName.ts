export default function formatTimezoneName(name: string) {
  return name.split("/").slice(1).reverse().join(", ").replaceAll("_", " ");
}
