<?php
session_start();
include 'conexao.php';

if(!isset($_SESSION['usuario_id'])){
    echo "nao logado";
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

$exercicio = $_POST['exercicio'] ?? null;
$carga = $_POST['carga'] ?? null;
$anotacao = $_POST['anotacao'] ?? "";

if(!$exercicio || !$carga){
    echo "faltando";
    exit;
}

$stmt = $conn->prepare("INSERT INTO prs (usuario_id, exercicio, carga, data, anotacao) VALUES (?, ?, ?, NOW(), ?)");
$stmt->bind_param("isds", $usuario_id, $exercicio, $carga, $anotacao);
$stmt->execute();

echo "ok";
