'use client'

import { useState } from 'react'

export function Command({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className="cmd">
      <pre tabIndex={0} aria-label={label}>
        <code>{text}</code>
      </pre>
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
