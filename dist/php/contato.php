<?php session_start();


?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contato - GymUp</title>
  
  <!-- Fontes e ícones -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/contato.css">
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

  <section class="contact-hero">
    <div class="contact-hero-content">
      <h1>Fale <span>Conosco</span></h1>
      <p>Tire suas dúvidas ou envie suas sugestões.</p>
    </div>
  </section>

  <section class="contact-section">
    <div class="contact-container">
      <div class="contact-info">
        <div class="contact-card">
          <div class="contact-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="contact-text">
            <h3>Nossa Localização</h3>
            <p>Av. Laranja, 123</p>
            <p>Jardim Melancia</p>
            <p>Ourinhos - SP</p>
            <p>CEP: 12345-678</p>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <i class="fas fa-phone-alt"></i>
          </div>
          <div class="contact-text">
            <h3>Telefones</h3>
            <a href="tel:+5511987654321">(14) 12345-6789</a>
            <a href="tel:+551123456789">(14) 12345-6789</a>
            <p>WhatsApp: (11) 98765-4321</p>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="contact-text">
            <h3>E-mail</h3>
            <a href="mailto:contato@fitpower.com">gymup@gmail.com</a>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="contact-text">
            <h3>Horário de Funcionamento</h3>
            <p>Segunda a Sexta: 6h - 22h</p>
            <p>Sábado: 8h - 18h</p>
            <p>Domingo: 9h - 13h</p>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <i class="fas fa-hashtag"></i>
          </div>
          <div class="contact-text">
            <h3>Redes Sociais</h3>
            <p>Siga-nos para dicas e novidades</p>
            <div class="social-media">
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
              <a href="#"><i class="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="contact-form">
        <form id="form-contato" action="../php/contato.php" method="POST">
          <div class="form-group">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" class="form-control" required name="nome">
          </div>
          
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" class="form-control" required name="email"> 
          </div>
          
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="tel" id="telefone" class="form-control" name="telefone" required>
          </div>
          
          <div class="form-group">
            <label for="assunto">Assunto</label>
            <select id="assunto" class="form-control" required name="assunto">
              <option value="">Selecione um assunto</option>
              <option value="duvida">Dúvida</option>
              <option value="matricula">Matrícula</option>
              <option value="sugestao">Sugestão</option>
              <option value="reclamacao">Reclamação</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="mensagem">Mensagem</label>
            <textarea id="mensagem" class="form-control" required name="mensagem"></textarea>
          </div>
          
          <button type="submit" class="btn-submit" value="Enviar">Enviar Mensagem</button>
        </form>
      </div>
    </div>
  </section>

  <section class="map-section">
    <div class="map-container">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975844550986!2d-46.65867592469144!3d-23.561347178799108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59ceb1eb771f%3A0xe904f6a669744da1!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1683138179352!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>

  <footer>
    <div class="footer-content">
      <div class="footer-column">
        <h3>GymUp</h3>
        <p style="color: var(--secondary-text-clr);">Transformando vidas através do conhecimento.</p>
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
          <li><i class="fas fa-phone"></i> (14) 99999-9999</li>
          <li><i class="fas fa-envelope"></i> gymup@gmail.com</li>
          <li><i class="fas fa-map-marker-alt"></i> Av. Fitness, 123 - São Paulo/SP</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2025 GymUp. Todos os direitos reservados.</p>
    </div>
  </footer>

  <script src="../js/contato.js"></script>
    
  </script>
</body>
</html>