<?php

#Insertar un nuevo contacto
require_once ('MysqliDb.php');
require_once ('credentials.php');
$db = new MysqliDb ($host, $username, $password, $databaseName);
//Capturar Datos


// Devuelve una conexión Mysqli
function get_conection(){
	global $host, $username, $password, $databaseName;
	return new MysqliDb ($host, $username, $password, $databaseName);
}

//Verificar autenticidad de administrador
function verificarPermisos(){
	/*Devuelve verdadero si esta logueado un administrador*/
	if (isset($_SESSION['ROL'])){  
  		if($_SESSION['ROL'] == 1) { return true; }
  		else{ return false; }}
	else{ return false; }
}

function generarCodigo($longitud) {
    $caracteres = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
    $codigo = '';
    for ($i = 1; $i <= $longitud; $i++) { $codigo .= $caracteres[numero_aleatorio(0, 35)]; }
    return $codigo;
}

function numero_aleatorio($ninicial, $nfinal) {
    $numero = rand($ninicial, $nfinal);
    return $numero;
}





?>
