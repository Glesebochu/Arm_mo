<?php
class Connect {
    private $host = 'localhost';
    private $user = 'root';
    private $pass = '';
    // private $db = 'Arm_mo';

    function __construct() {

    }

    function __getConnection() {
        $conn = new mysqli($this->host, $this->user, $this->pass);
        
        if ($conn->connect_error) {
            die('There is a connection error');
        }
        
        return $conn;
    }
}

?>