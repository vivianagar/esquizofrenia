$(document).ready(function(){

    var citas = [];
    
    Citas();
    async function Citas(){
      let destino_ = "php/get.php";
      let data_    = 'TABLE=citas'+
                     '&FIELDS='+JSON.stringify(['ID','NOMBRE','APELLIDOS','TIPO_DOCUMENTO','DOCUMENTO','EMAIL','CIUDAD','DIRECCION','CELULAR','MOTIVO_CONSULTA','PREGUNTAS'])+
                     '&FILTER=[]'+
                     '&GET_ALL=1';
      //Procesando solicitud
      await send(destino_, data_).then( 
        (resp)=>{ 
            citas = resp; 
            BuildTable(); 
        }, 
        (error)=>{ 
            alert("Error al consultar los datos");
        }
      );
    }
    
    function BuildTable(){
      var htmlTabla = "";
      for (var i=0; i<citas.length; i++) {
        htmlTabla += ""+
          "<tr>"+
              "<td>"+citas[i]["ID"]+"</td>"+
              "<td>"+citas[i]["NOMBRE"]+"</td>"+
              "<td>"+citas[i]["APELLIDOS"]+"</td>"+
              "<td>"+citas[i]["TIPO_DOCUMENTO"]+"</td>"+
              "<td>"+citas[i]["DOCUMENTO"]+"</td>"+
              "<td>"+citas[i]["EMAIL"]+"</td>"+
              "<td>"+citas[i]["CIUDAD"]+"</td>"+
              "<td>"+citas[i]["DIRECCION"]+"</td>"+
              "<td>"+citas[i]["MOTIVO_CONSULTA"]+"</td>"+
              "<!--td>"+get_answers(citas[i]["PREGUNTAS"])+"</td-->"+
              "<td align='center'>"+
                  "<button type='button' class='btn btn-outline-primary btn-circle mr4px edit' alt='"+citas[i]["ID"]+"'>Editar</button>"+
                  "<button type='button' class='btn btn-outline-danger btn-circle mr4px delete' alt='"+citas[i]["ID"]+"'>Eliminar</button>"+
              "</td>"+
            "</tr>";
      }
      $("#body_table").html(htmlTabla);
    } 
    
    $( "#body_table" ).on( "click", ".delete", function() {
        if($(this).hasClass("delete")){
            let idcita = parseInt($(this).attr("alt"));
            if( window.confirm("¿Estás seguro que desea eliminar este registro?") ){
                let condicion = [["ID", idcita, "="]];
                let destino_  = "php/delete.php";
                let data_     = 'TABLE=citas&FILTER='+JSON.stringify(condicion);
                //Procesando solicitud
                send(destino_, data_).then( 
                    (resp)=>{ 
                        Citas();
                    },(error)=>{ 
                        alert("Error al eliminar la cita");
                    }
                );      
            }
        }
    });
    
    $( "#body_table" ).on( "click", ".edit", function() {
        if($(this).hasClass("edit")){
            let idcita = parseInt($(this).attr("alt"));
            mostrarDatos(idcita);
        }
    });
    
    function mostrarDatos(id){
      for (var i=0; i<citas.length; i++) {
        if (citas[i]["ID"]==id) {
            $("#name").val(citas[i]["NOMBRE"]);
            $("#lastname").val(citas[i]["APELLIDOS"]);
            $("#typeId").val(citas[i]["TIPO_DOCUMENTO"]);
            $("#document").val(citas[i]["DOCUMENTO"]);
            $("#email").val(citas[i]["EMAIL"]);
            $("#city").val(citas[i]["CIUDAD"]);
            $("#address").val(citas[i]["DIRECCION"]);
            $("#phone").val(citas[i]["CELULAR"]);
            $("#message").val(citas[i]["MOTIVO_CONSULTA"]);
            $("#saveData").attr("alt", id);
        }
      }
      var editarModal = new bootstrap.Modal(document.getElementById('editarModal'), { keyboard: false })
      editarModal.show();
    }
    
    //Botón crear registro
    $("#saveData").click(function(){
        if( $("#name").val() == "" ){ alert("Debes escribir un nombre"); return; }
        if( $("#lastname").val() == "" ){ alert("Debes escribir el nombre de tu taller"); return; }
        if( $("#document").val() == "" ){ alert("Debes escribir tu documento"); return; }
        if( $("#message").val() == "" ){ alert("Debes escribir tu motivo de consulta"); return; }
        update($("#saveData").attr("alt"));
    });
    
    function update(_ID_ROW){
       
        let destino_ =  "php/update.php";
        let data_    =  'TABLE=citas'+
                        '&FILTER='+JSON.stringify([["ID", _ID_ROW, "="]])+
                        '&ROWS='+JSON.stringify({
                            NOMBRE          :$("#name").val(),
                            APELLIDOS       :$("#lastname").val(),
                            TIPO_DOCUMENTO  :$("#typeId option:selected").val(),
                            DOCUMENTO       :$("#document").val(),
                            EMAIL           :$("#email").val(),
                            CIUDAD          :$("#city").val(),
                            DIRECCION       :$("#address").val(),
                            CELULAR         :$("#phone").val(),
                            MOTIVO_CONSULTA :$("#message").val(),  
                        });
        
        //Procesando solicitud
        send(destino_, data_).then( 
            (resp)=>{ 
                alert('Felicidades tu cambio se registró con éxito'); 
                window.location = 'pagina4.html'; 
            },(error)=>{ 
                alert('Error! por favor intentalo después'); 
            }
        );
    }

    
    function get_answers(preguntas){
        let pe = JSON.parse(preguntas);
        let html = "";
        for (var i=0; i<pe.length; i++) {
            html += "<small>";
            html += "<strong>" + pe[i]["PREGUNTA"]+ "</strong>" + "<br>";
            let op = pe[i]["OPCIONES"];
            for (var j=0; j<op.length; j++) {
                html += op[j]["option"] + ": " + op[j]["respuesta"] + "<br>";
            }   
        }
        html += "</small>";
        return html;
    }



    //Función promesa para procesar todas las peticiones Ajax
    async function send(destino_, data_){
        return new Promise(function(resolve, reject) {
          $.ajax({
            async:true,
            type: "POST",
            timeout:60000,
            dataType: "html",
            contentType: "application/x-www-form-urlencoded",
            url:destino_,
            data:data_,
            beforeSend:function(){},
            success:function (datos){ return resolve( JSON.parse(datos) ); },
            error:function (error){ return reject(error); }
          }); 
        });
      }
  
});