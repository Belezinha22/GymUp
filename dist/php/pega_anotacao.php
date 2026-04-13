<?php
include 'conexao.php';
$pr_id = $_GET['pr_id'];
$q = $conn->query("SELECT anotacao FROM prs WHERE id=$pr_id");
$r = $q->fetch_assoc();
echo $r['anotacao'];
