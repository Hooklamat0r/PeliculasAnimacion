<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require_once "conexion.php";

$input = json_decode(file_get_contents('php://input'), true);

$id = intval($input['id']);

try {
    $sql = "DELETE FROM movies WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

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
