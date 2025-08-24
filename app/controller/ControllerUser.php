<?php
//************************************************* */
//CONTROLADOR DE USUARIO
//************************************************* */
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
    
                //generar token de 6 digitos
                $token  = rand(100000, 999999);
                $expira = date("Y-m-d H:i:s", strtotime("+5 minutes"));
                $usuario->Token($id_usuario, $token, $expira);


            }else{
                echo 'Error al crear el usuario';
            }
            

        }

    break;
}








?>