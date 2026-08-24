import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, content, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          សូមស្វាគមន៍មកកាន់ My Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Website ពេញលេញបង្កើតដោយ Next.js + Supabase។ បង្កើត និងមើល Posts បានភ្លាមៗ។
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/posts"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            មើល Posts ទាំងអស់
          </Link>
          <Link
            href="/create"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            បង្កើត Post ថ្មី
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Posts ថ្មីៗ</h2>
        {posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(post.created_at).toLocaleDateString('km-KH')}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
            មិនទាន់មាន Post នៅឡើយ។{' '}
            <Link href="/create" className="text-blue-600 hover:underline">
              បង្កើត Post ដំបូង
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
