export function toOnChainRepr(morzeCode: string): string {
  return morzeCode
    .replaceAll(".", "0")
    .replaceAll("-", "1")
    .replaceAll(" ", "+");
}

export function fromOnChainRepr(morzeCode: string): string {
  return morzeCode
    .replaceAll("0", ".")
    .replaceAll("1", "-")
    .replaceAll("+", " ");
}