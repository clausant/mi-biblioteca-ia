'use client';

import { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'neutral',
  flowchart: { useMaxWidth: true, htmlLabels: false }
});

export default function MermaidDiagram({ chart }) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function render() {
      try {
        const result = await mermaid.render(id, chart);
        if (active) setSvg(result.svg);
      } catch (err) {
        if (active) setError(err.message || 'No fue posible renderizar el diagrama.');
      }
    }
    if (chart) render();
    return () => { active = false; };
  }, [chart, id]);

  if (error) return <p className="diagramError">{error}</p>;
  if (!svg) return <p className="diagramLoading">Generando diagrama…</p>;

  return <div className="mermaidDiagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
