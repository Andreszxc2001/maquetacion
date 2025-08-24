<?php
// archivo: funciones/correo.php
require 'SimpleMail.php'; // tu clase de correo

function enviarCorreo($email, $token){
    $mail = new SimpleMail;
    $mail->setTo($email, 'Usuario Nuevo')
         ->setFrom('no-reply@tuapp.com', 'Mi App')
         ->setSubject('Verificación de cuenta')
         ->setMessage("<p>Tu código de verificación es: <b>$token</b></p>")
         ->send();
}
?>