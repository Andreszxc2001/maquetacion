<?php
// archivo: funciones/whatsapp.php
require 'UltraMsg.php'; // tu clase de ultramsg

function enviarWhatsapp($telefono, $token){
    $ultraMsg = new UltraMsg('TU_INSTANCE_ID', 'TU_TOKEN_API');
    $mensaje = "Tu código de verificación es: $token";
    $ultraMsg->sendChatMessage($telefono, $mensaje);
}
?>