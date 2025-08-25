<?php
// archivo: app/function/token_email.php
require_once $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/app/model/ModelUser.php';

// Intentar cargar SimpleMail desde diferentes ubicaciones
$simplemail_paths = [
    $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/includes/SimpleMail.php',
    $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/includes/simplemail/SimpleMail.php',
    $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/simplemail/SimpleMail.php',
    __DIR__ . '/../../includes/SimpleMail.php',
    __DIR__ . '/../../simplemail/SimpleMail.php'
];

$simplemail_loaded = false;
foreach ($simplemail_paths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $simplemail_loaded = true;
        break;
    }
}

if (!$simplemail_loaded) {
    // SimpleMail no encontrado, usaremos mail() básico de PHP
    error_log("SimpleMail no encontrado, usando mail() básico");
}

session_start();

$id_usuario = $_SESSION['id_usuario'] ?? null;
$email_user = $_SESSION['email']       ?? null;

// Valida sesión mínima
if (!$id_usuario || !$email_user) {
    http_response_code(400);
    exit('Faltan datos de sesión.');
}

$model = new ModelUsuario();
$token = $model->token_consulta($id_usuario);

if (!$token) {
    http_response_code(404);
    exit('No hay token activo para este usuario.');
}

// Validar formato de email
if (!filter_var($email_user, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Email inválido.');
}

function enviarCorreo($email, $token) {
    try {
        // Detectar si estamos en local (XAMPP) o en producción
        $esLocal = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) || 
                   (strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false);
        
        if (class_exists('Shuchkin\\SimpleMail')) {
            if ($esLocal) {
                // En local: usar SMTP de Gmail
                $mail = new Shuchkin\SimpleMail('smtp', [
                    'host'     => 'smtp.gmail.com',
                    'port'     => 587,
                    'username' => 'arnaldozxc@gmail.com',
                    'password' => 'cylx vory fpua skly', // ⬅️ AQUÍ pon tu contraseña de aplicación
                    'timeout'  => 10
                ]);
            } else {
                // En producción (InfinityFree): usar mail() básico
                $mail = new Shuchkin\SimpleMail('mail');
            }
            
            // Configurar el mensaje HTML con el token
            $htmlMessage = "
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                    <h2 style='color: #333; text-align: center;'>Código de Verificación</h2>
                    <div style='background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center;'>
                        <p style='font-size: 16px; margin-bottom: 20px;'>
                            Tu código de verificación es:
                        </p>
                        <div style='font-size: 24px; font-weight: bold; color: #007bff; 
                                    background-color: white; padding: 15px; border-radius: 5px; 
                                    border: 2px dashed #007bff; display: inline-block;'>
                            {$token}
                        </div>
                        <p style='font-size: 14px; color: #666; margin-top: 20px;'>
                            Este código expirará en 10 minutos por seguridad.
                        </p>
                    </div>
                    <p style='text-align: center; color: #666; font-size: 12px; margin-top: 20px;'>
                        Si no solicitaste este código, puedes ignorar este mensaje.<br>
                        Surtidorados de Aves - Arnaldo Pushaina
                    </p>
                </div>
            ";
            
            // Usar los métodos correctos de la clase Shuchkin\SimpleMail
            $mail->setTo($email, 'Usuario')
                 ->setFrom('arnaldozxc@gmail.com', 'Arnaldo Pushaina - Surtidorados de Aves')  
                 ->setSubject('Código de Verificación - Surtidorados de Aves')
                 ->setHTML($htmlMessage)
                 ->setText("Tu código de verificación es: {$token}");
            
            return $mail->send();
        } else {
            // Fallback: usar mail() básico de PHP
            $subject = 'Código de Verificación - Surtidorados de Aves';
            $message = "
                <html>
                <head><title>Código de Verificación</title></head>
                <body style='font-family: Arial, sans-serif;'>
                    <h2 style='color: #333; text-align: center;'>Código de Verificación</h2>
                    <div style='background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;'>
                        <p style='font-size: 16px; margin-bottom: 20px;'>
                            Tu código de verificación es:
                        </p>
                        <div style='font-size: 24px; font-weight: bold; color: #007bff; 
                                    background-color: white; padding: 15px; border-radius: 5px; 
                                    border: 2px dashed #007bff; display: inline-block;'>
                            {$token}
                        </div>
                        <p style='font-size: 14px; color: #666; margin-top: 20px;'>
                            Este código expirará en 10 minutos por seguridad.
                        </p>
                    </div>
                    <p style='text-align: center; color: #666; font-size: 12px;'>
                        Si no solicitaste este código, puedes ignorar este mensaje.<br>
                        Surtidorados de Aves - Arnaldo Pushaina
                    </p>
                </body>
                </html>
            ";
            
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
            $headers .= "From: Surtidorados de Aves <arnaldozxc@gmail.com>" . "\r\n";
            $headers .= "Reply-To: arnaldozxc@gmail.com" . "\r\n";
            
            return mail($email, $subject, $message, $headers);
        }
        
    } catch (Exception $e) {
        // Si todo falla, usar mail() súper básico
        error_log("Error enviando correo: " . $e->getMessage());
        
        $subject = 'Código de Verificación';
        $message = "Tu código de verificación es: " . $token;
        $headers = "From: arnaldozxc@gmail.com";
        
        return mail($email, $subject, $message, $headers);
    }
}

if (isset($_POST['action']) && $_POST['action'] === 'Email') {
    $resp = enviarCorreo($email_user, $token);
    
    if ($resp) {
        $_SESSION['mensaje_exito'] = 'Código enviado a tu correo electrónico.';
        header("Location: /maquetacion/view/home.html");
        exit();
    } else {
        http_response_code(500);
        exit('Error al enviar el correo. Inténtalo de nuevo.');
    }
}

http_response_code(400);
echo 'Acción inválida.';
?>