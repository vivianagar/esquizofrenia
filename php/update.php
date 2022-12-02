<?php

//Evitar cache, para trabajar en tiempo real
date_default_timezone_set('America/Bogota');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Access-Control-Allow-Origin: *");
header("Expires: Sat, 1 Jul 2000 05:00:00 GMT"); // Fecha en el pasado

//LLamado a las funciones
header("Content-type:application/json");
require_once ('MySQL/functions.php');
$db = get_conection();
//Recibira el siguiente parametro

//Capturamos la consulta
if( isset($_POST['TABLE']) && isset($_POST['FILTER']) && isset($_POST['ROWS'])){

  $TABLE    = $_POST['TABLE'];
  $FILTERS  = json_decode ($_POST['FILTER'], true);
  $ROWS     = json_decode ($_POST['ROWS'], true);

}else{ exit; }

//Preguntamos si se necesitan todos los registros
if( isset($_POST['FILTER']) ){
  foreach ($FILTERS as $FILTER) {
    $db  -> where ($FILTER[0], $FILTER[1], $FILTER[2]);  }} //Campo - Valor - Operador(=, >=, <=, <>)


//Imprimimos salida
echo json_encode($db  -> update ($TABLE, $ROWS), true);

?>
