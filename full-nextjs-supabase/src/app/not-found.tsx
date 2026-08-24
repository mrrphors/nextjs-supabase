import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-8">រកមិនឃើញទំព័រនេះទេ</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
      >
        ត្រលប់ទៅទំព័រដើម
      </Link>
    </div>
  )
}
