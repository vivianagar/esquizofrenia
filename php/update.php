<?php

header("Content-type:application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Cache-Control: no-cache, must-revalidate");

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
