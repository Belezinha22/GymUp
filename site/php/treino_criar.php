<?php session_start(); ?>

<?php
include 'conexao.php';

$usuario_id = $_POST['usuario_id'];
$nome = $_POST['nome'];
$dia_semana = $_POST['dia_semana'];

$sql = "INSERT INTO treinos (usuario_id, nome, dia_semana) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $usuario_id, $nome, $dia_semana);

if ($stmt->execute()) {
    echo "Treino criado com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>