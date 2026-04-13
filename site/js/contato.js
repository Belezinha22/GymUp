// Seleção de elementos
    const toggleBtn = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('nav a');
    const contactForm = document.getElementById('form-contato');

    // Controle do menu mobile
    toggleBtn.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('active');
      
      // Animação do ícone do menu
      toggleBtn.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
      
      // Bloqueio do scroll quando menu está aberto
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
          navbar.classList.remove('active');
          toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
          document.body.style.overflow = '';
        }
      });
    });

    // Efeito de scroll no header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      // Adiciona/remove classe scrolled
      if (currentScroll > 50) {
        header.classList.add('scrolled');
        
        // Esconde/mostra navbar durante scroll
        if (currentScroll > lastScroll && !navbar.classList.contains('active')) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.classList.remove('scrolled');
        header.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });

    // Redimensionamento da janela
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = '';
      }
    });

    // Formulário de contato
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulação de envio do formulário
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      console.log('Formulário enviado:', formValues);
      
      // Feedback visual (substituir por envio real)
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      contactForm.reset();
    });

    // Máscara para telefone
    const phoneInput = document.getElementById('telefone');
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 2) {
        value = `(${value.substring(0,2)}) ${value.substring(2)}`;
      }
      
      if (value.length > 10) {
        value = `${value.substring(0,10)}-${value.substring(10,14)}`;
      }
      
      e.target.value = value;
    });