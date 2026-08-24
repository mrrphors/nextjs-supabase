# My Blog – Next.js + Supabase (ពេញលេញ)

Website Blog ពេញលេញដែលរួមបញ្ចូល៖
- Navigation / Header
- បញ្ជី Posts
- Dynamic Page (`/posts/[id]`)
- Form បង្កើត Post (Server Action)
- Supabase Database
- Deploy-ready សម្រាប់ Vercel

## ១. តម្រូវការ

- Node.js 20+
- គណនី [Supabase](https://supabase.com)

## ២. Setup Supabase

1. បង្កើត Project ថ្មីនៅ Supabase
2. ចូល **SQL Editor** រួចរត់ពាក្យបញ្ជានេះ៖

```sql
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  created_at timestamptz default now()
);

-- អនុញ្ញាតឱ្យអាន និងសរសេរ (សម្រាប់ demo)
alter table posts enable row level security;

create policy "Allow public read" on posts
  for select using (true);

create policy "Allow public insert" on posts
  for insert with check (true);
```

3. ចូល **Project Settings → API** រួចចម្លង៖
   - Project URL
   - `anon` `public` key

## ៣. Setup Project

```bash
# ចូលទៅក្នុង folder
cd full-nextjs-supabase

# តម្លើង dependencies
npm install

# បង្កើត file .env.local
cp .env.example .env.local
```

បើក `.env.local` ហើយដាក់តម្លៃពិត៖

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...
```

## ៤. រត់ Project

```bash
npm run dev
```

បើក http://localhost:3000

## ៥. Deploy ទៅ Vercel

1. Push code ទៅ GitHub
2. ទៅ [vercel.com](https://vercel.com) → Import project
3. បន្ថែម Environment Variables ដូចក្នុង `.env.local`
4. Deploy

ឬប្រើ CLI៖

```bash
npm i -g vercel
vercel
```

## រចនាសម្ព័ន្ធ

```
src/
├── app/
│   ├── page.tsx              ← ទំព័រដើម
│   ├── layout.tsx            ← Layout + Header
│   ├── create/page.tsx       ← Form បង្កើត Post
│   ├── posts/
│   │   ├── page.tsx          ← បញ្ជី Posts
│   │   └── [id]/page.tsx    ← Dynamic detail page
│   └── not-found.tsx
├── components/
│   └── Header.tsx
└── lib/supabase/
    ├── client.ts
    └── server.ts
```

## មុខងារ

| មុខងារ              | Path              |
|---------------------|-------------------|
| ទំព័រដើម            | `/`               |
| បញ្ជី Posts         | `/posts`          |
| មើល Post លម្អិត    | `/posts/[id]`     |
| បង្កើត Post         | `/create`         |

---

**រួចរាល់!** ដាក់ API key រួច រត់ `npm run dev` ភ្លាមៗ។
