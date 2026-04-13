<?php session_start();


?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GymUp</title>

  <!-- Fontes e ícones -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/index.css">
  <link rel="shortcut icon" href="../img/logo/Logo-removebg-preview.png" type="image/x-icon">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
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

  <section class="hero">
    <div class="hero-content">
      <h1>Transforme seu <span>corpo</span>, transforme sua <span>vida</span></h1>
      <p>Na plataforma GymUp, combinamos ciência do exercício, nutrição e mentalidade vencedora para ajudar você a
        alcançar
        resultados extraordinários.</p>
      <div class="cta-buttons">
        <button class="btn btn-primary">Comece Agora</button>
      </div>
    </div>
  </section>

  <section class="features animationTarget">
    <div class="section-header">
      <h2>Nossos Diferenciais</h2>
      <p>Oferecemos uma abordagem completa para seu desenvolvimento físico e mental, com profissionais altamente
        qualificados e metodologia comprovada.</p>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <i class="fa-solid fa-dumbbell"></i>
        </div>
        <h3>Equipamentos Premium</h3>
        <p>Academia equipada com os melhores aparelhos do mercado para todos os níveis de condicionamento.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <h3>Resultados Comprovados</h3>
        <p>Metodologia baseada em evidências científicas para garantir seu progresso constante.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <i class="fa-solid fa-user-shield"></i>
        </div>
        <h3>Segurança em Primeiro Lugar</h3>
        <p>Todos os exercícios são supervisionados para garantir execução correta e evitar lesões.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <i class="fa-solid fa-utensils"></i>
        </div>
        <h3>Assessoria Nutricional</h3>
        <p>Planos alimentares personalizados para potencializar seus resultados.</p>
      </div>
    </div>
  </section>

  <section class="featured-classes animationTarget">
    <div class="section-header">
      <a href="metas.html">
        <h2>
          Metas
        </h2>
      </a>
    </div>
    <div class="featured-classes-grid">
      <div class="container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <div class="card-link">
                <img src="../img/general/iniciantes.jpg" alt="" class="card-image">
                <p class="badge InI">
                  Iniciantes
                </p>
                <h2 class="card-title">
                  Criar o hábito de treinar regularmente, melhorar o condicionamento físico, aprender a executar
                  exercícios corretamente.
                </h2>
                <button class="card-button">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </li>
            <li class="card-item swiper-slide">
              <a href="#" class="card-link">
                <img src="../img/general/hipertrofia.jpg" alt="" class="card-image">
                <p class="badge Hip">
                  Hipertrofia
                </p>
                <h2 class="card-title">
                  Aumentar a força e resistência muscular, melhorar a postura e estabilidade corporal, desenvolver
                  grupos musculares específicos.
                </h2>
                <button class="card-button">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="#" class="card-link">
                <img src="../img/general/emag_def.jpg" alt="" class="card-image">
                <p class="badge e_d">
                  Emagrecimento e Definição
                </p>
                <h2 class="card-title">
                  Reduzir percentual de gordura corporal, aumentar o gasto calórico diário, melhorar a resistência
                  cardiovascular.
                </h2>
                <button class="card-button">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="#" class="card-link">
                <img src="../img/general/perf_cond.jpg" alt="" class="card-image">
                <p class="badge p_c">
                  Performance e Condicionamento
                </p>
                <h2 class="card-title">
                  Aumentar resistência aeróbica, melhorar o desempenho em treinos funcionais ou de alta intensidade e
                  aumentar a mobilidade
                </h2>
                <button class="card-button">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="#" class="card-link">
                <img src="../img/general/bem_saude.jpg" alt="" class="card-image">
                <p class="badge b_s">
                  Bem estar e Saúde
                </p>
                <h2 class="card-title">
                  Reduzir dores musculares e melhorar a postura, aumentar a qualidade do sono e
                  desenvolver uma rotina de treinos equilibrada.</h2>
                <button class="card-button">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </a>
            </li>
          </ul>

          <div class="swipper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
    </div>
  </section>




  <footer>
    <div class="footer-content animationTarget">
      <div class="footer-column">
        <h3>GymUp</h3>
        <p style="color: var(--secondary-text-clr);">Transformando vidas.</p>
        <div class="social-links">
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-tiktok"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h3>Links Rápidos</h3>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="sobre.html">Sobre Nós</a></li>
          <li><a href="#">Planos</a></li>
          <li><a href="../html/contato.html">Contato</a></li>
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
          <li><i class="fas fa-phone"></i> (14) 98765-4321</li>
          <li><i class="fas fa-envelope"></i> gymup@gmail.com</li>
          <li><i class="fas fa-map-marker-alt"></i> Av. Laranja, Jardim Melancia 123 - Ourinhos SP</p>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2025 GymUp. Todos os direitos reservados.</p>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="../js/index.js"></script>
</body>

</html>