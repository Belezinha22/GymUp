<?php
session_start();
include 'conexao.php';

if (!isset($_SESSION['usuario_id'])) {
  header("Location: index.php");
  exit;
}

$usuario_id = $_SESSION['usuario_id'];

// ======= Processar formulários =======
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  // PERFIL
  if ($_POST['action'] === 'saveProfile') {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $weight = $_POST['weight'];
    $height = $_POST['height'];
    $goal = $_POST['goal'];

    $stmt = $conn->prepare("UPDATE usuarios SET nome=?, idade=?, peso=?, altura=?, objetivo=? WHERE id=?");
    $stmt->bind_param("sidssi", $name, $age, $weight, $height, $goal, $usuario_id);
    $stmt->execute();
  }

  // META
  if ($_POST['action'] === 'saveGoal') {
    $desc = $_POST['desc'];
    $plan = $_POST['plan'];

    $stmt = $conn->prepare("SELECT id FROM metas WHERE usuario_id=?");
    $stmt->bind_param("i", $usuario_id);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0) {
      $stmt = $conn->prepare("UPDATE metas SET descricao=?, plano=? WHERE usuario_id=?");
      $stmt->bind_param("ssi", $desc, $plan, $usuario_id);
    } else {
      $stmt = $conn->prepare("INSERT INTO metas (usuario_id, descricao, plano) VALUES (?, ?, ?)");
      $stmt->bind_param("iss", $usuario_id, $desc, $plan);
    }
    $stmt->execute();
  }

  // PR
  if ($_POST['action'] === 'addPR') {
    $exercise = $_POST['exercise'];
    $prWeight = $_POST['weight'];
    $prDate = $_POST['date'];
    $stmt = $conn->prepare("INSERT INTO prs (usuario_id, exercicio, carga, data) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isds", $usuario_id, $exercise, $prWeight, $prDate);
    $stmt->execute();
  }

  // HISTÓRICO
  if ($_POST['action'] === 'addHistory') {
    $histDate = $_POST['date'];
    $histWeight = $_POST['weight'];
    $histWaist = $_POST['waist'];
    $histHip = $_POST['hip'];
    $stmt = $conn->prepare("INSERT INTO historico (usuario_id, data, peso, cintura, quadril) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("isddd", $usuario_id, $histDate, $histWeight, $histWaist, $histHip);
    $stmt->execute();
  }

  header("Location: perfil.php");
  exit;
}

// ======= Buscar dados =======
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE id=?");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$perfil = $stmt->get_result()->fetch_assoc();

$stmt = $conn->prepare("SELECT * FROM metas WHERE usuario_id=?");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$meta = $stmt->get_result()->fetch_assoc();

$stmt = $conn->prepare("SELECT * FROM prs WHERE usuario_id=? ORDER BY data ASC");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$prs = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

$stmt = $conn->prepare("SELECT * FROM historico WHERE usuario_id=? ORDER BY data ASC");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$history = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

// ======= Cálculo IMC =======
$imc = null;
$imcClassificacao = "";

if (!empty($perfil['peso']) && !empty($perfil['altura']) && $perfil['altura'] > 0) {
  $imc = $perfil['peso'] / ($perfil['altura'] * $perfil['altura']); // altura em metros
  $imc = round($imc, 1);

  if ($imc < 18.5) {
    $imcClassificacao = "Abaixo do peso";
  } elseif ($imc >= 18.5 && $imc < 24.9) {
    $imcClassificacao = "Peso normal";
  } elseif ($imc >= 25 && $imc < 29.9) {
    $imcClassificacao = "Sobrepeso";
  } elseif ($imc >= 30 && $imc < 34.9) {
    $imcClassificacao = "Obesidade Grau I";
  } elseif ($imc >= 35 && $imc < 39.9) {
    $imcClassificacao = "Obesidade Grau II";
  } else {
    $imcClassificacao = "Obesidade Grau III";
  }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8" />
  <title>Perfil do Usuário</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="../css/perfil.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
        <li><a href="../php/perfil.php">Perfil</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- Informações Pessoais e IMC -->
    <section style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <h3>Informações Pessoais</h3>
        <ul>
          <li><strong>Nome:</strong> <?= htmlspecialchars($perfil['nome']) ?></li>
          <li><strong>Idade:</strong> <?= htmlspecialchars($perfil['idade']) ?></li>
          <li><strong>Peso:</strong> <?= htmlspecialchars($perfil['peso']) ?> kg</li>
          <li><strong>Altura:</strong> <?= htmlspecialchars($perfil['altura']) ?> m</li>
          <li><strong>Objetivo:</strong> <?= htmlspecialchars($perfil['objetivo']) ?></li>
        </ul>
      </div>
      <div style="text-align: center; border: 1px solid #ccc; padding: 10px; border-radius: 8px; min-width: 150px;">
        <h4>IMC</h4>
        <?php if ($imc !== null): ?>
          <p><strong><?= $imc ?></strong></p>
          <p><?= $imcClassificacao ?></p>
        <?php else: ?>
          <p>Dados insuficientes</p>
        <?php endif; ?>
      </div>
    </section>

    <!-- Meta Atual -->
    <section>
      <h3>Meta Atual</h3>
      <ul>
        <li><strong>Plano:</strong> <?= htmlspecialchars($meta['plano'] ?? '') ?></li>
        <li><strong>Descrição:</strong> <?= htmlspecialchars($meta['descricao'] ?? '') ?></li>
      </ul>
    </section>


    <!-- PRs -->
    <section>
      <h3>PRs (Personal Records)</h3>
      <table class="table-like">
        <thead>
          <tr>
            <th>Exercício</th>
            <th>Carga (kg)</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($prs as $p): ?>
            <tr>
              <td><?= $p['exercicio'] ?></td>
              <td><?= $p['carga'] ?></td>
              <td><?= $p['data'] ?></td>
              <td>
                <button class="btnAnotacao" data-id="<?= $p['id'] ?>">📝</button>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>

      <div id="modalAnotacao"
        style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,.6); align-items:center; justify-content:center;">
        <div style="background:#fff; padding:20px; width:300px; border-radius:8px;">
          <h3>Anotação</h3>
          <form action="salvar_anotacao.php" method="POST">
            <input type="hidden" name="pr_id" id="prId">
            <textarea name="anotacao" id="anotacaoTxt" maxlength="200" style="width:100%; height:120px;"></textarea>
            <br><br>
            <button type="submit">Salvar</button>
            <button type="button"
              onclick="document.getElementById('modalAnotacao').style.display='none'">Cancelar</button>
          </form>
        </div>
      </div>



      <form method="POST">
        <input type="hidden" name="action" value="addPR">
        <label>Exercício<input type="text" name="exercise" required></label>
        <label>Carga (kg)<input type="number" step="0.1" name="weight" required></label>
        <label>Data<input type="date" name="date" required></label>
        <button type="submit" class="btn btn-primary">Adicionar PR</button>
      </form>
    </section>

    <!-- Evolução Física -->
    <section>
      <h3>Evolução Física</h3>
      <table class="table-like">
        <thead>
          <tr>
            <th>Data</th>
            <th>Peso</th>
            <th>Cintura</th>
            <th>Quadril</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($history as $h): ?>
            <tr>
              <td><?= $h['data'] ?></td>
              <td><?= $h['peso'] ?></td>
              <td><?= $h['cintura'] ?></td>
              <td><?= $h['quadril'] ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>

      <form method="POST">
        <input type="hidden" name="action" value="addHistory">
        <label>Data<input type="date" name="date" required></label>
        <label>Peso<input type="number" step="0.1" name="weight" required></label>
        <label>Cintura<input type="number" step="0.1" name="waist" required></label>
        <label>Quadril<input type="number" step="0.1" name="hip" required></label>
        <button type="submit" class="btn btn-primary">Adicionar Histórico</button>
      </form>
    </section>

    <!-- Gráficos -->
    <section>
      <h3>Gráficos de Progresso</h3>
      <div class="chart-container">
        <div>
          <h5>Peso Corporal</h5><canvas id="weightChart"></canvas>
        </div>
        <div>
          <h5>Força (por exercício)</h5><canvas id="strengthChart"></canvas>
        </div>
      </div>
    </section>

    <!-- Ações -->
    <section>
      <h1>Ações</h1>
      <div class="action-buttons" style="display: flex; gap: 15px;">
        <button class="action-btn edit-btn" id="btnEditProfile">Editar Perfil</button>
        <button class="action-btn delete-btn" onclick="confirmarExclusao()">Excluir conta</button>
      </div>
    </section>

    <!-- MODAL EDITAR PERFIL -->
    <div id="profileModal" class="modal-overlay">
      <div class="modal">
        <h4>Editar Perfil</h4>
        <form method="POST">
          <input type="hidden" name="action" value="saveProfile">
          <label>Nome<input type="text" name="name" value="<?= htmlspecialchars($perfil['nome']) ?>"></label>
          <label>Idade<input type="number" name="age" value="<?= htmlspecialchars($perfil['idade']) ?>"></label>
          <label>Peso (kg)<input type="number" step="0.1" name="weight"
              value="<?= htmlspecialchars($perfil['peso']) ?>"></label>
          <label>Altura (m)<input type="number" step="0.01" name="height"
              value="<?= htmlspecialchars($perfil['altura']) ?>"></label>
          <label>Objetivo
            <select name="goal">
              <option <?= ($perfil['objetivo'] == 'Emagrecimento') ? 'selected' : '' ?>>Emagrecimento</option>
              <option <?= ($perfil['objetivo'] == 'Hipertrofia') ? 'selected' : '' ?>>Hipertrofia</option>
              <option <?= ($perfil['objetivo'] == 'Condicionamento') ? 'selected' : '' ?>>Condicionamento</option>
            </select>
          </label>
          <div class="modal-buttons">
            <button type="button" id="cancelProfile" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>

    <script>


      document.querySelectorAll('.btnAnotacao').forEach(btn => {
        btn.addEventListener('click', () => {
          const prId = btn.getAttribute('data-id');

          fetch("pega_anotacao.php?pr_id=" + prId)
            .then(r => r.text())
            .then(txt => {
              document.getElementById('prId').value = prId;
              document.getElementById('anotacaoTxt').value = txt;
              document.getElementById('modalAnotacao').style.display = 'flex';
            });
        });
      });




      const modal = document.getElementById('profileModal');
      document.getElementById('btnEditProfile').onclick = () => modal.style.display = 'flex';
      document.getElementById('cancelProfile').onclick = () => modal.style.display = 'none';

      // Gráficos fakes
      new Chart(document.getElementById('weightChart'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [{ label: 'Peso (kg)', data: [75, 74, 73, 72, 71], borderColor: '#00E676', backgroundColor: 'rgba(0,230,118,0.2)', fill: true, tension: 0.3 }]
        }
      });

      new Chart(document.getElementById('strengthChart'), {
        type: 'bar',
        data: {
          labels: ['Supino', 'Agachamento', 'Levantamento Terra'],
          datasets: [{ label: 'Carga Máxima (kg)', data: [60, 90, 100], backgroundColor: ['#FF7043', '#00E676', '#29B6F6'] }]
        }
      });

      // Confirmar exclusão
      function confirmarExclusao() {
        if (confirm("Tem certeza que deseja excluir sua conta? Esta ação é permanente!")) {
          window.location.href = "excluir_conta.php";
        }
      }
    </script>
</body>

</html>