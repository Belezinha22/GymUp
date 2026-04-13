<?php session_start();


?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sobre Nós - GymUp</title>
  
  <!-- Fontes e ícones -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/sobre.css">
  <link rel="shortcut icon" href="../img/logo/Logo-removebg-preview.png" type="image/x-icon">

</head>
<body>
  <header id="header">
    <div class="logo">
      <img src="../img/logo/Logo-removebg-preview.png" alt="Logo FitPower">
      <h2>GymUp</h2>
    </div>
    <button class="menu-toggle" id="menu-toggle"><i class="fa-solid fa-bars"></i></button>
    <nav id="navbar">
      <ul>
        <li><a href="../php/index.php">Início</a></li>
        <li><a href="../php/meta_criar.php">Metas</a></li>
        <li><a href="../php/sobre.php">Sobre</a></li>
        <li><a href="../php/contato.php">Contato</a></li>

        <?php if (isset($_SESSION['usuario_id'])): ?>
          <!-- Se estiver logado -->
          <li><a href="perfil.php">Perfil</a></li>
        <?php else: ?>
          <!-- Se não estiver logado -->
          <li><a href="login.php">Entrar</a></li>
        <?php endif; ?>
      </ul>
    </nav>
  </header>

  <section class="about-hero">
    <div class="about-hero-content">
      <h1>Nossa <span>Jornada</span> Fitness</h1>
      <p>Desde 2010 transformando vidas através do fitness com excelência, paixão e resultados comprovados.</p>
    </div>
  </section>

  <section class="history-section">
    <div class="section-header">
      <h2>Nossa História</h2>
    </div>
    <div class="history-content">
      <div class="history-text">
        <p>Fundada em 2010 por Marco Silva, ex-atleta profissional, a FitPower nasceu da visão de criar um espaço onde o fitness fosse mais do que exercício - uma filosofia de vida.</p>
        <p>Começamos como um pequeno estúdio no centro de São Paulo, com apenas 3 instrutores e um punhado de alunos dedicados. Hoje, temos 5 unidades espalhadas pela cidade e mais de 50 profissionais altamente qualificados.</p>
        <p>Nosso diferencial sempre foi o atendimento personalizado e a abordagem científica dos treinos, combinando as melhores técnicas de musculação, cardio e treinamento funcional.</p>
      </div>
      <div class="history-image">
        <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Academia FitPower nos primeiros anos">
      </div>
    </div>
  </section>

  <section class="team-section">
    <div class="section-header">
      <h2>Nossa Equipe</h2>
      <p>Profissionais certificados e apaixonados por transformar vidas</p>
    </div>
    <div class="team-grid">
      <div class="team-member">
        <div class="member-image">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Marco Silva">
        </div>
        <div class="member-info">
          <h3>Marco Silva</h3>
          <p class="position">Fundador & Head Coach</p>
          <p class="bio">Ex-atleta profissional com mais de 15 anos de experiência em treinamento de alto desempenho.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      
      <div class="team-member">
        <div class="member-image">
          <img src="https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Ana Beatriz">
        </div>
        <div class="member-info">
          <h3>Ana Beatriz</h3>
          <p class="position">Nutricionista Esportiva</p>
          <p class="bio">Especialista em nutrição para performance e composição corporal, formada pela USP.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      
      <div class="team-member">
        <div class="member-image">
          <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Carlos Mendes">
        </div>
        <div class="member-info">
          <h3>Carlos Mendes</h3>
          <p class="position">Especialista em Treino Funcional</p>
          <p class="bio">Certificado internacionalmente com experiência em reabilitação e treino para atletas.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="values-section">
    <div class="section-header">
      <h2>Nossos Valores</h2>
      <p>Princípios que guiam cada decisão e interação na FitPower</p>
    </div>
    <div class="values-grid">
      <div class="value-card">
        <div class="value-icon">
          <i class="fas fa-heartbeat"></i>
        </div>
        <h3>Saúde em Primeiro Lugar</h3>
        <p>Priorizamos o bem-estar físico e mental acima de tudo, com programas seguros e eficazes.</p>
      </div>
      
      <div class="value-card">
        <div class="value-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <h3>Excelência Profissional</h3>
        <p>Nossa equipe está em constante atualização para oferecer o que há de melhor em fitness.</p>
      </div>
      
      <div class="value-card">
        <div class="value-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>Comunidade</h3>
        <p>Criamos um ambiente acolhedor onde todos se sentem parte de algo maior.</p>
      </div>
      
      <div class="value-card">
        <div class="value-icon">
          <i class="fas fa-medal"></i>
        </div>
        <h3>Resultados Comprovados</h3>
        <p>Metodologia baseada em ciência para garantir seu progresso constante e mensurável.</p>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="cta-content">
      <h2>Pronto para Transformar Sua Vida?</h2>
      <p>Junte-se à família FitPower e comece sua jornada fitness hoje mesmo com profissionais que realmente se importam com seus resultados.</p>
      <a href="planos.html" class="btn btn-primary">Conheça Nossos Planos</a>
    </div>
  </section>

  <footer>
    <div class="footer-content">
      <div class="footer-column">
        <h3>FitPower</h3>
        <p style="color: var(--secondary-text-clr);">Transformando vidas através do fitness desde 2010.</p>
        <div class="footer-social">
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-tiktok"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h3>Links Rápidos</h3>
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="sobre.html">Sobre Nós</a></li>
          <li><a href="treinos.html">Treinos</a></li>
          <li><a href="planos.html">Planos</a></li>
          <li><a href="contato.html">Contato</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Horário de Funcionamento</h3>
        <ul>
          <li>Segunda a Sexta: 6h - 22h</li>
          <li>Sábado: 8h - 18h</li>
          <li>Domingo: 9h - 13h</li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Contato</h3>
        <ul>
          <li><i class="fas fa-phone"></i> (11) 98765-4321</li>
          <li><i class="fas fa-envelope"></i> contato@fitpower.com</li>
          <li><i class="fas fa-map-marker-alt"></i> Av. Fitness, 123 - São Paulo/SP</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2025 FitPower Academy. Todos os direitos reservados.</p>
    </div>
  </footer>

  <script src="../js/sobre.js"></script>

</body>
</html>