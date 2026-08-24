import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default function CreatePostPage() {
  async function createPost(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if (!title?.trim() || !content?.trim()) {
      return
    }

    const supabase = await createClient()
    const { error } = await supabase.from('posts').insert({
      title: title.trim(),
      content: content.trim(),
    })

    if (error) {
      console.error('Error creating post:', error)
      // In production you might want to show an error message
      return
    }

    redirect('/posts')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/posts" className="text-blue-600 hover:underline text-sm">
          ← ត្រលប់
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">បង្កើត Post ថ្មី</h1>

      <form action={createPost} className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            ចំណងជើង
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="សរសេរចំណងជើង..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            ខ្លឹមសារ
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            placeholder="សរសេរខ្លឹមសារ..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          បង្កើត Post
        </button>
      </form>
    </div>
  )
}
