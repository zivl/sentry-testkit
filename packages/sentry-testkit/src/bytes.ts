// Buffer in Node.js, TextEncoder/TextDecoder in browsers (Puppeteer page context)
export function toBytes(input: string | Uint8Array): Uint8Array {
  if (typeof input !== 'string') {
    return input
  }
  return typeof Buffer !== 'undefined'
    ? Buffer.from(input)
    : new TextEncoder().encode(input)
}

export function fromBytes(bytes: Uint8Array): string {
  return typeof Buffer !== 'undefined'
    ? Buffer.from(bytes).toString()
    : new TextDecoder().decode(bytes)
}
