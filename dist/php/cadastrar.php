<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $senha = trim($_POST['senha']);
    $peso = !empty($_POST['peso']) ? floatval($_POST['peso']) : 0;
    $altura = !empty($_POST['altura']) ? floatval($_POST['altura']) : 0;
    $idade = !empty($_POST['idade']) ? intval($_POST['idade']) : 0;
    $objetivo = trim($_POST['objetivo']);

    if ($nome && $email && $senha && $idade && $objetivo) {

        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, peso, altura, idade, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssddis", $nome, $email, $senhaHash, $peso, $altura, $idade, $objetivo);

        if ($stmt->execute()) {
            // Cadastro realizado com sucesso, redireciona
            header("Location: meta_criar.php");
            exit;
        } else {
            $msg = "❌ Erro ao cadastrar: " . $stmt->error;
        }

        $stmt->close();
    } else {
        $msg = "Preencha todos os campos obrigatórios.";
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro - GymUp</title>
  <link rel="stylesheet" href="../css/cadastro.css">
</head>

<body>
  <div class="container">
    <div class="cadastro-image-container">
      <img src="../img/background/cadastroIMG.jpg" alt="Imagem de cadastro" class="cadastro-image">
<button class="back-button" onclick="window.location.href='index.php'">Voltar para o site</button>
    </div>

    <div class="cadastro-section">
      <div class="cadastro-container">
        <div class="cadastro-header">
          <h2>Crie sua conta e comece agora!</h2>
        </div>

        <form class="cadastro-form" method="post" action="">
          <div class="form-row-2">
            <div class="form-group">
              <input type="text" name="nome" id="nome" placeholder="Nome.." required>
            </div>
            <div class="form-group">
              <input type="email" name="email" id="email" placeholder="Email.." required>
            </div>
          </div>

          <div class="form-group password-input">
            <input type="password" name="senha" id="senha" placeholder="Senha.." required>
          </div>

          <div class="form-group">
            <input type="number" name="idade" id="idade" placeholder="Idade.." required>
          </div>

          <div class="form-group">
            <input type="number" step="0.01" name="peso" id="peso" placeholder="EX: 70">
          </div>

          <div class="form-group">
            <input type="number" step="0.01" name="altura" id="altura" placeholder="EX: 1.70">
          </div>

          <div class="form-group">
            <select name="objetivo" id="objetivo" required>
              <option value="" disabled selected>Selecione seu objetivo</option>
              <option value="Hipertrofia">Hipertrofia</option>
              <option value="Emagrecimento">Emagrecimento</option>
              <option value="Condicionamento">Condicionamento</option>
              <option value="Bem-estar">Bem-estar</option>
            </select>
          </div>

          <div class="form-group" style="display: flex; align-items: center;">
            <input type="checkbox" id="agreeTerms" required>
            <p> Eu concordo com os <a href="#" class="terms">Termos e Condições</a></p>
          </div>

          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>

        <?php if (!empty($msg)) echo "<p class='msg'>$msg</p>"; ?>

        <div class="auth-footer">
          <p>Já tem uma conta? <a href="login.php">Faça login</a></p>
        </div>
      </div>
    </div>
  </div>

</body>

</html>
