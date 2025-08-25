<?php
//************************************************* */
//MODULO DE TABLA USUARIO
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
    $stmt = $this->conn->prepare($sql);
    $stmt -> execute([
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
    return $this->conn->lastInsertId();
    }

    

    //************************************************ */
    //Funcion: insertar token
    //************************************************ */
    
    public function token($id_usuario, $token, $expira){
        $sql = "INSERT INTO TOKENS (
                    id_usuario,
                    token,
                    expira
            )VALUES (
                    :id_usuario,
                    :token,
                    :expira
                   )";
        $stmt = $this->conn->prepare($sql);
        $stmt -> execute([
            'id_usuario'    => $id_usuario,
            'token'         => $token,
            'expira'        => $expira
            ]);
        return $this->conn->lastInsertId();
    }


    //************************************************ */
    //Funcion: consultar token
    //************************************************ */

    public function token_consulta($id_usuario){
    $sql = "SELECT token
            FROM tokens
            WHERE id_usuario = :id_usuario
              AND expira > NOW()
              AND usado = 0
            ORDER BY expira DESC
            LIMIT 1";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute([':id_usuario' => $id_usuario]);
    $token = $stmt->fetchColumn(); // string o false si no hay registro
    return $token ?: null;
}




    //************************************************ */
    // Funcion: verificar token
    //************************************************ */
    public function token_verifica($id_usuario, $token) {
        $sql = "SELECT id_token 
                FROM tokens
                WHERE id_usuario = :id_usuario
                AND token = :token
                AND expira > NOW()
                AND usado = 0
                LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':id_usuario' => $id_usuario,
            ':token'      => $token
        ]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->token_usar($row['id_token']);
            $this->usuario_activar($id_usuario);
            return true;
        }
        return false;
    }

    //************************************************ */
    // Funcion: marcar token como usado
    //************************************************ */
    public function token_usar($id_token) {
        $sql = "UPDATE tokens 
                SET usado = 1 
                WHERE id_token = :id_token";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':id_token' => $id_token]);
        return $stmt->rowCount() > 0;
    }

    //************************************************ */
    // Funcion: marcar token como usado
    //************************************************ */
    public function usuario_activar($id_usuario) {
    $sql = "UPDATE usuarios 
            SET estado_verificacion = 'VERIFICADO',
                fecha_actualizacion = NOW()
            WHERE id_usuario = :id_usuario";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute([':id_usuario' => $id_usuario]);
    return $stmt->rowCount() > 0;
    }



}
?>