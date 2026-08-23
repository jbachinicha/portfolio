/**
 * The contact address is stored reversed so it never appears verbatim in the
 * exported HTML or the JS bundle, which defeats the regex-based harvesters
 * that crawl static sites. It is reassembled in the browser by `MailLink`.
 *
 * To change it, reverse your address and paste the result here:
 *
 *   node -e "console.log([...'you@example.com'].reverse().join(''))"
 */
const REVERSED = "moc.liamg@51ahcinihcabyaj";

export function decodeEmail(): string {
  return REVERSED.split("").reverse().join("");
}
