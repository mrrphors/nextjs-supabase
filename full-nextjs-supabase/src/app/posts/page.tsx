import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function PostsPage() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, content, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        មានបញ្ហាក្នុងការទាញទិន្នន័យ៖ {error.message}
        <p className="mt-2 text-sm">
          សូមពិនិត្យ Environment Variables និងតារាង <code>posts</code> ក្នុង Supabase។
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts ទាំងអស់</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + បង្កើត Post
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
              <p className="text-xs text-gray-400 mt-3">
                {new Date(post.created_at).toLocaleString('km-KH')}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-500">
          មិនទាន់មាន Post។{' '}
          <Link href="/create" className="text-blue-600 hover:underline">
            បង្កើតឥឡូវ
          </Link>
        </div>
      )}
    </div>
  )
}
