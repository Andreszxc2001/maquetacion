<?php
// archivo: app/function/token_whats.php
require_once $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/app/model/ModelUser.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/includes/ultramsg.class.php';

session_start();

$id_usuario     = $_SESSION['id_usuario'] ?? null;
$telefono_user  = $_SESSION['whatsapp']   ?? null;

// Valida sesión mínima
if (!$id_usuario || !$telefono_user) {
    http_response_code(400);
    exit('Faltan datos de sesión.');
}

$model  = new ModelUsuario();
$token  = $model->token_consulta($id_usuario); // ahora devuelve string o null

if (!$token) {
    // No hay token vigente: aquí podrías generar uno nuevo o mostrar error.
    // Ejemplo simple:
    http_response_code(404);
    exit('No hay token activo para este usuario.');
}

// Normaliza número: quita no-dígitos y antepone +57
$telefono_limpio = preg_replace('/\D+/', '', $telefono_user);
$telefono = '+57' . $telefono_limpio;

function enviarWhatsapp($telefono, $token){
    // Credenciales reales de UltraMsg
    $ultramsg_token = "f19319f50ymw5axp";
    $instance_id    = "127776"; 

    $client  = new UltraMsg\WhatsAppApi($ultramsg_token, $instance_id);
    $mensaje = "Tu código de verificación es: " . $token;

    return $client->sendChatMessage($telefono, $mensaje);
}

if (isset($_POST['action']) && $_POST['action'] === 'WhatsApp') {
    $resp = enviarWhatsapp($telefono, $token);

    // Si quieres ver la respuesta de la API para depurar:
    // var_dump($resp); exit;

    header("Location: /maquetacion/view/code.html");
    exit();
}

http_response_code(400);
echo 'Acción inválida.';
