import Link from 'next/link'

export default function NotFound() {
  return (
    <header className="page-head">
      <h1>That page isn&rsquo;t here</h1>
      <p className="lede">
        The address may have changed. <Link href="/">Go to the overview</Link>, or try the{' '}
        <Link href="/faq">questions and answers</Link>.
      </p>
    </header>
  )
}
