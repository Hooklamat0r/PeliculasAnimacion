<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require_once "conexion.php";

$input = json_decode(file_get_contents('php://input'), true);

// Extraer datos
$id = intval($input['id']);
$title = trim($input['title']);
$posterURL = isset($input['posterURL']) ? trim($input['posterURL']) : null;
$imdbId = trim($input['imdbId']);



try {
    $sql = "UPDATE movies SET title = :title, posterURL = :posterURL, imdbId = :imdbId WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    $stmt->bindValue(':title', $title, PDO::PARAM_STR);
    $stmt->bindValue(':posterURL', $posterURL, $posterURL !== null ? PDO::PARAM_STR : PDO::PARAM_NULL);
    $stmt->bindValue(':imdbId', $imdbId, PDO::PARAM_STR);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        http_response_code(200);
        exit;
    } else {
        http_response_code(500);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    exit;
}

