<?php
include 'conexao.php';

$pr_id = $_POST['pr_id'];
$anot = $_POST['anotacao'];

$stmt = $conn->prepare("UPDATE prs SET anotacao=? WHERE id=?");
$stmt->bind_param("si",$anot,$pr_id);
$stmt->execute();

header("Location: perfil.php");
exit;
