<?php

header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Cache-Control: no-cache, must-revalidate");

//Evitar cache, para trabajar en tiempo real
date_default_timezone_set('America/Bogota');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 1 Jul 2000 05:00:00 GMT"); // Fecha en el pasado
header("Access-Control-Allow-Origin: *");

//LLamado a las funciones
header("Content-type:application/json");
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
require_once ('MySQL/functions.php');
$db = get_conection();
//Recibira el siguiente parametro

//Capturamos la consulta
if( isset($_POST['TABLE']) && isset($_POST['ROWS']) ){ 

  $TABLE   = $_POST['TABLE'];
  $ROWS  = json_decode ($_POST['ROWS'], true);

}else{ 

	if( isset($_GET['TABLE']) && isset($_GET['ROWS']) ){
	  $TABLE   = $_GET['TABLE'];
	  $ROWS  = json_decode ($_GET['ROWS'], true);
	}else{ exit; }

}

//Insertamos todos los registros necesarios
foreach ($ROWS as $ROW) {
	$id = $db->insert ($TABLE, $ROW); 
}


//IMPRIMIR SALIDA
if($id!=null) echo json_encode(array('ID' => $id ), true );
else  echo json_encode(array('ID' => $id, 'ERROR' => $db->getLastError() ), true );


?>
