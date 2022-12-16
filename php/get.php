<?php

header("Content-type:application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Cache-Control: no-cache, must-revalidate");

date_default_timezone_set('America/Bogota');

//LLamado a las funciones
require_once ('MySQL/functions.php');
$db = get_conection();
//Recibira el siguiente parametro

//Capturamos la consulta
if( isset($_POST['TABLE']) && isset($_POST['FIELDS']) && isset($_POST['FILTER']) && isset($_POST['GET_ALL']) ){

  $TABLE   = $_POST['TABLE'];
  $FIELDS  = json_decode ($_POST['FIELDS'], true);
  $FILTERS  = json_decode ($_POST['FILTER'], true);
  $GET_ALL = $_POST['GET_ALL'];

}else{ exit; }

//Preguntamos si se necesitan todos los registros
if($GET_ALL!=1){
  foreach ($FILTERS as $FILTER) {
    if($FILTER[2]=="LIKE") 
      $db  -> where ($FILTER[0], '%'.$FILTER[1].'%', $FILTER[2]);  
    else 
      $db  -> where ($FILTER[0], $FILTER[1], $FILTER[2]);  
  }
} //Campo - Valor - Operador(=, >=, <=, <>)



//Imprimimos salida
echo json_encode($db  -> get ($TABLE, null, $FIELDS), true);

 ?>
