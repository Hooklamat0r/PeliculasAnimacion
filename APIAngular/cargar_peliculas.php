<?php

require_once "conexion.php";

$stmt = $pdo->query("SELECT * FROM movies");

$peliculas = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($peliculas);