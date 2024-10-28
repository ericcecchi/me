import mermaid from 'mermaid';
import { useEffect } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      themeCSS: ``,
      fontFamily: 'Fira Code',
    });
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{chart}</div>;
}
