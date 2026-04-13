<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    echo "⚠️ Você precisa estar logado para salvar uma meta.";
    exit;
}

include "conexao.php";

// Recebe os dados do POST
$descricao   = $_POST['descricao'] ?? '';
$status      = $_POST['status'] ?? ''; // padrão "Em andamento"
$data_inicio = $_POST['data_inicio'] ?? date('Y-m-d');
$data_fim    = $_POST['data_fim'] ?? null;
$usuario_id  = $_SESSION['usuario_id'];

// Validação simples
if (empty($descricao)) {
    echo "❌ Descrição da meta não pode ficar vazia.";
    exit;
}

// Insere no banco
$sql = "INSERT INTO metas (usuario_id, descricao, status, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $usuario_id, $descricao, $status, $data_inicio, $data_fim);

if ($stmt->execute()) {
    echo "✅ Meta '$descricao' salva com sucesso!";
} else {
    echo "❌ Erro ao salvar a meta: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
