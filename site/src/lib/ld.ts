// JSON-LD for a <script> tag: "<" is escaped so no value can close the tag.
export const ld = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
