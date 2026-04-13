import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { plans } from '../data/plans';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { selectedPlan } = useApp();
  const featuredPlan = plans.find((plan) => plan.slug === selectedPlan) ?? plans[0];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % plans.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="page">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Treino, constancia e clareza</span>
          <h1>Transforme o antigo GymUp em uma experiencia React pronta para evoluir.</h1>
          <p>
            Esta nova base remove PHP do frontend, organiza o projeto como SPA e deixa o caminho aberto
            para conectar qualquer backend depois.
          </p>
          <div className="hero-actions">
            <Link to="/metas" className="primary-button">Escolher plano</Link>
            <Link to={`/planos/${featuredPlan.slug}`} className="secondary-button">Ver plano atual</Link>
          </div>
        </div>
        <div className="hero-card">
          <img src={featuredPlan.heroImage} alt={featuredPlan.label} />
          <div className="hero-card-body">
            <strong>Plano em destaque</strong>
            <h2>{featuredPlan.label}</h2>
            <p>{featuredPlan.description}</p>
          </div>
        </div>
      </section>

      <section className="legacy-features">
        <div className="section-copy">
          <span className="eyebrow">Nossos diferenciais</span>
          <h2>Voltamos com a atmosfera original do GymUp.</h2>
          <p>
            Reforcei o visual escuro com verde e laranja, mantive a proposta fitness original
            e reintroduzi a navegacao em destaque para os objetivos do projeto.
          </p>
        </div>
        <div className="feature-strip">
          <article className="legacy-feature-card">
            <strong>Equipamentos premium</strong>
            <p>Treinos guiados com foco em execucao correta e progressao consistente.</p>
          </article>
          <article className="legacy-feature-card">
            <strong>Resultados comprovados</strong>
            <p>Planos pensados para iniciantes, hipertrofia, definicao e condicionamento.</p>
          </article>
          <article className="legacy-feature-card">
            <strong>Seguranca em primeiro lugar</strong>
            <p>Videos, observacoes e anotacoes por exercicio em um unico fluxo.</p>
          </article>
        </div>
      </section>

      <section className="carousel-section">
        <div className="section-copy">
          <span className="eyebrow">Metas</span>
          <h2>Carrossel de planos restaurado</h2>
          <p>Agora a home volta a ter destaque visual para os objetivos, com avancar, voltar e autoplay.</p>
        </div>

        <div className="carousel-shell">
          <button
            type="button"
            className="carousel-control"
            onClick={() => setCurrentSlide((current) => (current - 1 + plans.length) % plans.length)}
          >
            ‹
          </button>

          <div className="carousel-track">
            {plans.map((plan, index) => {
              const offset = (index - currentSlide + plans.length) % plans.length;
              const normalizedOffset = offset === plans.length - 1 ? -1 : offset;
              const isActive = index === currentSlide;

              return (
                <article
                  key={plan.slug}
                  className={isActive ? 'carousel-card active' : 'carousel-card'}
                  style={{
                    transform: `translateX(${normalizedOffset * 88}%) scale(${isActive ? 1 : 0.9})`,
                    opacity: Math.abs(normalizedOffset) > 1 ? 0 : 1,
                    zIndex: isActive ? 3 : 2 - Math.abs(normalizedOffset),
                  }}
                >
                  <img src={plan.heroImage} alt={plan.label} />
                  <div className="carousel-card-body">
                    <span className="soft-badge">{plan.label}</span>
                    <h3>{plan.title}</h3>
                    <p>{plan.description}</p>
                    <Link to={`/planos/${plan.slug}`} className="inline-link">
                      Ver detalhes
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-control"
            onClick={() => setCurrentSlide((current) => (current + 1) % plans.length)}
          >
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {plans.map((plan, index) => (
            <button
              key={plan.slug}
              type="button"
              aria-label={`Ir para ${plan.label}`}
              className={index === currentSlide ? 'carousel-dot active' : 'carousel-dot'}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Arquitetura</span>
          <strong>React + Vite</strong>
          <p>Rotas client-side e organizacao por componentes.</p>
        </article>
        <article className="stat-card">
          <span>Persistencia</span>
          <strong>localStorage</strong>
          <p>Sem banco por enquanto, mas com experiencia funcional.</p>
        </article>
        <article className="stat-card">
          <span>Conteudo</span>
          <strong>Planos e perfil</strong>
          <p>Metas, PRs, historico corporal e paginas institucionais.</p>
        </article>
      </section>

      <section className="plan-grid">
        {plans.map((plan) => (
          <article key={plan.slug} className="plan-card">
            <img src={plan.heroImage} alt={plan.label} />
            <div className="plan-card-content">
              <div className="pill">{plan.label}</div>
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <Link to={`/planos/${plan.slug}`} className="inline-link">Explorar plano</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
