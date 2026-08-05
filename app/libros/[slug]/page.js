import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getBook(slug) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const response = await fetch(
    `${url}/rest/v1/books?select=*&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`,
    {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 }
    }
  );

  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

export default async function BookPage({ params }) {
  const { slug } = await params;
  const book = await getBook(slug);
  if (!book) notFound();

  return (
    <main className="bookPage">
      <div className="bookWrap">
        <Link className="backLink" href="/">← Volver a la biblioteca</Link>
        <div className="bookHero">
          <div>
            <span className="eyebrow">{book.category || 'LIBRO'}</span>
            <h1>{book.title}</h1>
            <p className="bookAuthor">{book.author || 'Autor no informado'}</p>
          </div>
          <div className="score">★ {book.rating ?? '—'}<small>/10</small></div>
        </div>

        <section className="reviewSection">
          <h2>Resumen</h2>
          <p>{book.summary}</p>
        </section>

        {(book.key_ideas || []).length > 0 && (
          <section className="reviewSection">
            <h2>Ideas principales</h2>
            <ol className="ideasList">
              {book.key_ideas.map((idea, index) => <li key={index}>{idea}</li>)}
            </ol>
          </section>
        )}

        <section className="reviewSection">
          <h2>Reseña</h2>
          {(book.review || '').split('\n').filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>

        <div className="tags detailTags">
          {(book.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </main>
  );
}
