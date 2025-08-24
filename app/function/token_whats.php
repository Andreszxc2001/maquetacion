<?php
// archivo: funciones/whatsapp.php
require_once $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/app/model/ModelUser.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/includes/ultraMsg.php';

$id_usaario = $_SESSION['id_usuario'];
$telefono   = $_SESSION['whatsapp'];

$token_usuario = new ModelUsuario();

$token = $token_usuario->token_consulta($id_usaario);


function enviarWhatsapp($telefono, $token){
    $ultraMsg = new UltraMsg('TU_INSTANCE_ID', 'TU_TOKEN_API');
    $mensaje = "Tu código de verificación es: $token";
    $ultraMsg->sendChatMessage($telefono, $mensaje);
}
?>