<?php
session_start();
include 'conexao.php';

$msg = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $senha = $_POST['senha'];

  $sql = "SELECT id, nome, senha FROM usuarios WHERE email = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($senha, $row['senha'])) {
      // ✅ Inicia sessão
      $_SESSION['usuario_id'] = $row['id'];
      $_SESSION['usuario_nome'] = $row['nome'];

      // ✅ Redireciona para index.php
      header("Location: index.php");
      exit();
    } else {
      $msg = "❌ Senha incorreta!";
    }
  } else {
    $msg = "❌ Usuário não encontrado!";
  }

  $stmt->close();
  $conn->close();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - GymUp</title>
  <link rel="stylesheet" href="../css/login.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter&display=swap" rel="stylesheet">
  <link rel="shortcut icon" href="../img/logo/Logo-removebg-preview.png" type="image/x-icon">
</head>

<body>
  <div class="container">
    <section class="container-image">
      
    </section>
    <section class="auth-section">
      <div class="auth-container">
        <div class="auth-header">
          <h2>Bem-vindo de volta!</h2>
          <p>Acesse sua conta para continuar sua jornada fitness</p>
        </div>

        <!-- FORMULÁRIO DE LOGIN -->
        <form id="login-form" class="auth-form" method="post" action="">
          <div class="form-group">
            <label for="login-email">E-mail</label>
            <input type="email" id="login-email" name="email" required>
          </div>

          <div class="form-group">
            <label for="login-password">Senha</label>
            <div class="password-input">
              <input type="password" id="login-password" name="senha" required>
              <button type="button" class="toggle-password">
                <i class="fa-regular fa-eye"></i>
              </button>
            </div>
            <a href="#" class="forgot-password">Esqueceu a senha?</a>
          </div>

          <button type="submit" class="btn btn-primary auth-btn">Entrar</button>

          <div class="auth-footer">
            <p>Não tem uma conta? <a href="../php/cadastrar.php">Cadastre-se</a></p>
          </div>
        </form>

        <?php if (!empty($msg)): ?>
          <p style="margin-top:15px; font-weight:bold; color:red;"><?= $msg ?></p>
        <?php endif; ?>
      </div>
    </section>
  </div>


  <script src="../js/index.js"></script>
</body>

</html>