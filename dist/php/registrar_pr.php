<?php session_start(); ?>

<?php
include 'conexao.php';

$usuario_id = $_POST['usuario_id'];
$exercicio_id = $_POST['exercicio_id'];
$carga_max = $_POST['carga_max'];
$data_registro = $_POST['data_registro'];

$sql = "INSERT INTO historico_pr (usuario_id, exercicio_id, carga_max, data_registro) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iids", $usuario_id, $exercicio_id, $carga_max, $data_registro);

if ($stmt->execute()) {
    echo "PR registrado com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>