import Link from 'next/link';
import { notFound } from 'next/navigation';
import MermaidDiagram from '../../components/MermaidDiagram';

async function getBook(slug) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const response = await fetch(
    `${url}/rest/v1/books?select=*&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`,
    {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store'
    }
  );

  if (!response.ok) return null;
  const rows = await response.json();
  return rows[0] || null;
}

function BulletSection({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="reviewSection">
      <h2>{title}</h2>
      <ul className="detailList">
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </section>
  );
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

        <section className="reviewSection leadSection">
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

        {book.architecture_diagram && (
          <section className="reviewSection diagramSection">
            <div className="sectionIntro">
              <span className="eyebrow">MAPA CONCEPTUAL</span>
              <h2>Cómo organiza el libro un sistema de IA</h2>
              <p>Una síntesis visual de la relación entre necesidad de negocio, arquitectura, ciclo de vida del modelo y operación.</p>
            </div>
            <MermaidDiagram chart={book.architecture_diagram} />
          </section>
        )}

        <section className="reviewSection longReview">
          <h2>Reseña en profundidad</h2>
          {(book.review || '').split('\n').filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>

        <div className="reviewColumns">
          <BulletSection title="Fortalezas" items={book.strengths} />
          <BulletSection title="Limitaciones" items={book.weaknesses} />
        </div>

        <BulletSection title="Aplicaciones prácticas" items={book.practical_applications} />

        {book.conclusion && (
          <section className="reviewSection conclusionBox">
            <span className="eyebrow">CONCLUSIÓN</span>
            <p>{book.conclusion}</p>
          </section>
        )}

        <div className="tags detailTags">
          {(book.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </main>
  );
}
