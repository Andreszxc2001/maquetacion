<?php
//************************************************* */
//CONTROLADOR DE USUARIO
//************************************************* */
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/app/model/ModelUser.php';


//inicalizar clases
$usuario = new ModelUsuario();


$action = isset($_POST['action']) ? $_POST['action'] : '';

switch ($action){

    case 'login':


    break;

    case 'crear':

        //********************************************** */
        //CREAR USUARIO
        //********************************************** */
        if($_SERVER['REQUEST_METHOD'] == 'POST'){

            $array = [
                'id_rol'        => trim($_POST['id_rol']),
                'nombre'        => trim($_POST['nombre']),
                'apellido'      => trim($_POST['apellido']),
                'tipo_documento'=> trim($_POST['tipo_documento']),
                'n_documento'   => trim($_POST['n_documento']),
                'n_telefono'    => trim($_POST['n_telefono']),
                'email'         => trim($_POST['email']),
                'usuario'       => trim($_POST['usuario']),
                'contrasena'    => trim($_POST['contrasena'])
            ];


            //validar que los campos no esten vacios
            foreach ($array AS $data => $values){
                if(empty($values)){
                    echo 'Todos los campos son obligatorios';
                    exit;
                }
            }

            
            //insertar datos
            $id_usuario = $usuario->insertar($array);

            if($id_usuario){

                // Generar token
                $token = rand(100000, 999999);
                $expira = date("Y-m-d H:i:s", strtotime('+5 minutes'));
                $usuario->Token($id_usuario, $token, $expira);
            

                $_SESSION['id_usuario'] = $id_usuario;
                $_SESSION['whatsapp']   = $array['n_telefono'];
                $_SESSION['email']      = $array['email'];

                header('Location: /maquetacion/view/token.html');
                exit;

            }else{

                $_SESSION['mensaje'] = 'Error al crear el usuario';
                header('Location: /maquetacion/view/form.html');
                exit;
            }
        }
    break;

    case 'verificar':

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        $id_usuario = $_SESSION['id_usuario'] ?? null;
        $token      = isset($_POST['token']) ? trim($_POST['token']) : null;

        if(!$id_usuario || !$token){
            echo 'Faltan datos';
            exit;
        }

        if(!method_exists($usuario, 'token_verifica')){
            die('Error: método token_verifica no existe.');
        }

        $verificado = $usuario->token_verifica($id_usuario, $token);

        if($verificado){
            $_SESSION['autenticado'] = true;
            header('Location: /maquetacion/view/form.html');
            exit;
        } else {
            echo 'Token inválido o expirado.';
            exit;
        }
    }

break;



}







?>