import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-screen items-center justify-center py-20">
      <div className="max-w-xl rounded-[28px] border border-line bg-surface/80 p-8 text-center sm:p-12">
        <p className="label">404</p>
        <h1 className="display-l mt-3">This page is not in the build plan.</h1>
        <p className="mt-4 text-ink-2">The link may be stale, or the page is still under construction.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back home</Link>
          <Link href="/#contact" className="btn">Contact me</Link>
        </div>
      </div>
    </main>
  );
}
