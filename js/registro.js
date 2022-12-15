$(document).ready(function(){

    //Botón crear registro
    $("#submitButton").click(function(){
        if( $("#name").val() == "" ){ alert("Debes escribir un nombre"); return; }
        if( $("#lastname").val() == "" ){ alert("Debes escribir el nombre de tu taller"); return; }
        if( $("#document").val() == "" ){ alert("Debes escribir tu documento"); return; }
        if( $("#message").val() == "" ){ alert("Debes escribir tu motivo de consulta"); return; }
        register();
    });
    
    //Función crear registro
    function register(){

        let preguntas = [
            {
                "PREGUNTA" :"¿En los últimos meses, usted ha tenido uno de los siguientes síntomas cognitivos?",
                "OPCIONES" :[
                    { 
                        "option":"Perdida de memoria", 
                        "respuesta": ($("#form_1_1").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Dificultad para leer", 
                        "respuesta": ($("#form_1_2").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Dificultad para entablar una conversación", 
                        "respuesta": ($("#form_1_3").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Dificultad para modificar sus planes", 
                        "respuesta": ($("#form_1_4").is(':checked'))?"SI":"NO"
                    }
                ]
            },
            {
                "PREGUNTA" :"¿Usted ha tenido alguno de los siguientes episodios?",
                "OPCIONES" :[
                    { 
                        "option":"Psicóticos", 
                        "respuesta": ($("#form_2_2").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Agresivos", 
                        "respuesta": ($("#form_2_1").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Ninguna de las anteriores", 
                        "respuesta": ($("#form_2_3").is(':checked'))?"SI":"NO"
                    }
                ]
            },
            {
                "PREGUNTA" :"Durante este periodo ud ha:",
                "OPCIONES" :[
                    { 
                        "option":" Bebidas alcohólicas", 
                        "respuesta": ($("#form_3_1").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Tabaco", 
                        "respuesta": ($("#form_3_2").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Sustancias psicoactivas", 
                        "respuesta": ($("#form_3_3").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Ninguna de las anteriores", 
                        "respuesta": ($("#form_3_4").is(':checked'))?"SI":"NO"
                    }
                ]
            },
            {
                "PREGUNTA" :"En los últimos meses usted ha tenido:",
                "OPCIONES" :[
                    { 
                        "option":"Alucinaciones", 
                        "respuesta": ($("#form_4_1").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Cambios bruscos de comportamiento", 
                        "respuesta": ($("#form_4_2").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Episodios de anciedad", 
                        "respuesta": ($("#form_4_3").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Depresión", 
                        "respuesta": ($("#form_4_4").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Dificultad para adaptarse a entornos ", 
                        "respuesta": ($("#form_4_5").is(':checked'))?"SI":"NO"
                    },
                    { 
                        "option":"Dificultades afectivas", 
                        "respuesta": ($("#form_4_6").is(':checked'))?"SI":"NO"
                    }
                ]
            }
        ];

        let destino_ = "php/post.php";
        let data_    = 'TABLE=citas'+'&ROWS='+JSON.stringify([
            {
                ID	            :null,
                NOMBRE          :$("#name").val(),
                APELLIDOS       :$("#lastname").val(),
                TIPO_DOCUMENTO  :$("#typeId option:selected").val(),
                DOCUMENTO       :$("#document").val(),
                EMAIL           :$("#email").val(),
                CIUDAD          :$("#city").val(),
                DIRECCION       :$("#address").val(),
                CELULAR         :$("#phone").val(),
                MOTIVO_CONSULTA :$("#message").val(),
                PREGUNTAS       :JSON.stringify(preguntas),
            }
        ]);
        //Procesando solicitud
        send(destino_, data_).then( 
            (resp)=>{ 
                alert('Felicidades tu solicitud de cita se registró con éxito'); 
                window.location = 'pagina4.html'; 
            },(error)=>{ 
                alert('Error! por favor intentalo después'); 
            }
        );    
      
      
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