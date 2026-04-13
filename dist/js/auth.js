document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Simulação de login (substituir por chamada real à API)
      if (email && password) {
        localStorage.setItem('userEmail', email);
        window.location.href = '../index.html';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  }

  // Register form submission
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      
      // Validações básicas
      if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      
      if (!document.getElementById('terms').checked) {
        alert('Você deve aceitar os termos de serviço.');
        return;
      }
      
      // Simulação de cadastro (substituir por chamada real à API)
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'login.html';
    });
  }
});