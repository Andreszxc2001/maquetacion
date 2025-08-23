<?php
//************************************************* */
//mODULO DE TABLA USUARIO
//************************************************* */
require_once $_SERVER['DOCUMENT_ROOT'] . '/maquetacion/config/database.php';


//clase ModelUsuario
class ModelUsuario{

    //atributos de la conexion
    private $conn;

    //constructor de la clase ModelUsuario
    public function __construct() {
        $this->conn = db::conectar();
    }


    //************************************************ */
    //Funcion: insertar usuarios
    //************************************************ */
    Public function insertar($array){

    $sql = "INSERT INTO USUARIOS (
                    id_rol,
                    nombre,
                    apellido,
                    tipo_documento,
                    n_documento,
                    n_telefono,
                    email,
                    usuario,
                    contrasena
            )VALUES (
                    :id_rol,
                    :nombre,
                    :apellido,
                    :tipo_documento,
                    :n_documento,
                    :n_telefono,
                    :email,
                    :usuario,
                    :contrasena
                   )";
    $stmt = $this->conn -> prepare($sql);
    return $stmt -> execute([
        'id_rol'        => $array['id_rol'],
        'nombre'        => $array['nombre'],
        'apellido'      => $array['apellido'],
        'tipo_documento'=> $array['tipo_documento'],
        'n_documento'   => $array['n_documento'],
        'n_telefono'    => $array['n_telefono'],
        'email'         => $array['email'],
        'usuario'       => $array['usuario'],
        'contrasena'    => password_hash($array['contrasena'], PASSWORD_DEFAULT)
        ]);    
    }
    
    




}
?>