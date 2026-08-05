const books = [
  { title: 'Arquitectura empresarial', type: 'Arquitectura', status: 'Procesado' },
  { title: 'IA y conocimiento corporativo', type: 'Inteligencia Artificial', status: 'Procesado' },
  { title: 'Data & Analytics', type: 'Datos', status: 'Pendiente' }
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <span className="eyebrow">SEGUNDO CEREBRO</span>
        <h1>Mi Biblioteca <strong>IA</strong></h1>
        <p>Centraliza documentos, libros y conocimiento. Luego deja que la IA los convierta en información que puedas encontrar y reutilizar.</p>
        <div className="search">⌕ <span>Buscar en mi conocimiento…</span><kbd>⌘ K</kbd></div>
      </section>

      <section className="content">
        <div className="stats">
          <article><b>3</b><span>Documentos</span></article>
          <article><b>2</b><span>Procesados por IA</span></article>
          <article><b>1</b><span>Pendiente</span></article>
        </div>

        <div className="heading"><div><span className="eyebrow">CONOCIMIENTO</span><h2>Biblioteca</h2></div><button>+ Agregar documento</button></div>
        <div className="grid">
          {books.map((book) => (
            <article className="card" key={book.title}>
              <div className="icon">▤</div>
              <span className="tag">{book.type}</span>
              <h3>{book.title}</h3>
              <p>Documento disponible para búsqueda semántica, resumen y consulta mediante IA.</p>
              <div className="cardFooter"><span className={book.status === 'Procesado' ? 'ok' : 'pending'}>● {book.status}</span><span>→</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
