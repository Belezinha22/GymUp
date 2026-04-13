<?php
session_start();
include 'conexao.php';

if (!isset($_SESSION['usuario_id'])) {
  header("Location: ../index.php");
  exit;
}

$id = $_SESSION['usuario_id'];

// Exclui
$sql = "DELETE FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

session_destroy();

echo "<script>alert('Conta excluída com sucesso!'); window.location='index.php';</script>";
exit;
?>
