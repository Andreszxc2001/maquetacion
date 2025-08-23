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


    Public function consultar($array){

        
    }




}
?>