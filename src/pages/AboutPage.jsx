export default function AboutPage() {
  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">Sobre</span>
        <h1>Uma base mais moderna para o GymUp continuar evoluindo.</h1>
        <p>
          O projeto antigo foi reinterpretado como SPA em React, mantendo a identidade fitness e removendo a
          dependencia do fluxo em PHP.
        </p>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <h3>O que mudou</h3>
          <p>Frontend migrado para componentes, rotas declarativas e estado persistido no navegador.</p>
        </article>
        <article className="info-card">
          <h3>O que foi mantido</h3>
          <p>Metas, trilhas de treino, identidade visual e os assets de imagem e video do projeto original.</p>
        </article>
        <article className="info-card">
          <h3>Proximo passo natural</h3>
          <p>Conectar um backend em Node, FastAPI ou outra stack quando voce quiser reintroduzir persistencia real.</p>
        </article>
      </section>

      <section className="timeline-card">
        <div>
          <span className="eyebrow">Arquitetura</span>
          <h2>Do site PHP para uma SPA pronta para APIs</h2>
        </div>
        <ol className="timeline-list">
          <li>Interface institucional e paginas de plano reunidas em React Router.</li>
          <li>Perfil, PRs e historico mantidos com localStorage para nao depender de banco.</li>
          <li>Estrutura pronta para substituir as funcoes locais por chamadas HTTP no futuro.</li>
        </ol>
      </section>
    </div>
  );
}
