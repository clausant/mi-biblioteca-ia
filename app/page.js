import Link from 'next/link';

async function getBooks() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];

  const response = await fetch(
    `${url}/rest/v1/books?select=slug,title,author,category,rating,summary,tags,published&published=eq.true&order=created_at.desc`,
    {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 }
    }
  );

  if (!response.ok) return [];
  return response.json();
}

export default async function Home() {
  const books = await getBooks();
  const categories = [...new Set(books.map((b) => b.category).filter(Boolean))];

  return (
    <main>
      <section className="hero">
        <span className="eyebrow">BIBLIOTECA PERSONAL</span>
        <h1>Mi Biblioteca <strong>IA</strong></h1>
        <p>Reseñas de libros analizadas con inteligencia artificial, con ideas clave, aplicaciones prácticas y conocimiento reutilizable.</p>
        <div className="search">⌕ <span>Próximamente: buscar por libro, autor o concepto</span></div>
      </section>

      <section className="content">
        <div className="stats">
          <article><b>{books.length}</b><span>Libros publicados</span></article>
          <article><b>{categories.length}</b><span>Categorías</span></article>
          <article><b>{books.filter((b) => b.rating).length}</b><span>Reseñas evaluadas</span></article>
        </div>

        <div className="heading">
          <div><span className="eyebrow">CONOCIMIENTO</span><h2>Biblioteca</h2></div>
        </div>

        {books.length === 0 ? (
          <p className="empty">No hay libros publicados todavía.</p>
        ) : (
          <div className="grid">
            {books.map((book) => (
              <Link className="card" href={`/libros/${book.slug}`} key={book.slug}>
                <div className="icon">▤</div>
                <span className="tag">{book.category || 'Sin categoría'}</span>
                <h3>{book.title}</h3>
                <p className="author">{book.author || 'Autor no informado'}</p>
                <p>{book.summary}</p>
                <div className="tags">
                  {(book.tags || []).slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="cardFooter"><span className="ok">★ {book.rating ?? '—'} / 10</span><span>Ver reseña →</span></div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
