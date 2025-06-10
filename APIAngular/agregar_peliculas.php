<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Tengo esto para evitar que el preflight me genere uno vacío al hacver la petición de agregar

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "conexion.php";

$input = json_decode(file_get_contents('php://input'), true);

$title = trim($input['title']);
$posterURL = trim($input['posterURL']);
$imdbId = trim($input['imdbId']);


// Preparar e insertar
try {
    $stmt = $pdo->prepare("INSERT INTO movies (title, posterURL, imdbId) VALUES (:title, :posterURL, :imdbId)");
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':posterURL', $posterURL);
    $stmt->bindParam(':imdbId', $imdbId);
    $stmt->execute();

    http_response_code(200);
    echo json_encode(["message" => "Película insertada correctamente", "id" => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(["error" => "Error al insertar: " . $e->getMessage()]);
}