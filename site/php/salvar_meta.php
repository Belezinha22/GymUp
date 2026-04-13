<?php
session_start();
include "conexao.php";

if(!isset($_SESSION['usuario_id'])){
    echo "not_logged";
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$plano = $_POST['plano'] ?? '';
$desc = $_POST['descricao'] ?? '';

if(!$plano || !$desc){
    echo "empty";
    exit;
}

$stmt = $conn->prepare("UPDATE usuarios SET plano = ?, plano_desc = ? WHERE id = ?");
$stmt->bind_param("ssi", $plano, $desc, $usuario_id);

echo $stmt->execute() ? "ok" : "erro";

$stmt->close();
$conn->close();
