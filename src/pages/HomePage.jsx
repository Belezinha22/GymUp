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
      <section
        className="hero-panel"
        style={{ '--hero-panel-image': `url(${featuredPlan.heroImage})` }}
      >
        <div className="hero-copy">
          <span className="eyebrow">Treino, constância e clareza</span>
          <h1>Transforme o antigo GymUp em uma experiência React pronta para evoluir.</h1>
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
            e reintroduzi a navegação em destaque para os objetivos do projeto.
          </p>
        </div>
        <div className="feature-strip">
          <article className="legacy-feature-card">
            <strong>Equipamentos premium</strong>
            <p>Treinos guiados com foco em execução correta e progressão consistente.</p>
          </article>
          <article className="legacy-feature-card">
            <strong>Resultados comprovados</strong>
            <p>Planos pensados para iniciantes, hipertrofia, definição e condicionamento.</p>
          </article>
          <article className="legacy-feature-card">
            <strong>Segurança em primeiro lugar</strong>
            <p>Videos, observações e anotacoes por exercício em um único fluxo.</p>
          </article>
        </div>
      </section>

      <section className="carousel-section">
        <div className="section-copy">
          <span className="eyebrow">Metas</span>
          <h2>Carrossel de planos restaurado</h2>
          <p>Agora a home volta a ter destaque visual para os objetivos, com avançar, voltar e autoplay.</p>
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

    </div>
  );
}
