<?php session_start(); ?>
<?php
include 'conexao.php';

$usuario_id = $_GET['usuario_id'];

$sql = "SELECT * FROM treinos WHERE usuario_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$treinos = [];
while ($row = $result->fetch_assoc()) {
    $treinos[] = $row;
}

echo json_encode($treinos);

$stmt->close();
$conn->close();
?>