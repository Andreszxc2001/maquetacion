<?php
class DB
{
    private static $host = 'localhost';
    private static $user = 'root';
    private static $pass = '';
    private static $db   = 'maquetacion';
    private static $conn = null;

    public static function conectar()
    {
        if (self::$conn === null) {
            try {
                self::$conn = new PDO(
                    "mysql:host=" . self::$host . ";dbname=" . self::$db . ";charset=utf8",
                    self::$user,
                    self::$pass
                );
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                exit('Database connection error: ' . $e->getMessage());
            }
        }
        return self::$conn;
    }
}
?>