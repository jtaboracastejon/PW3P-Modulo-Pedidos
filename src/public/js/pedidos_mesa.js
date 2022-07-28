$(document).ready(function($){ 
    $(".pedidoselaboradosmodificar").on("click",function(){ 
        window.location.replace($(this).val()); 
        /*$.ajax({ 
            url: $(this).val(), 
            type: "GET", 
            success: function(response){ 
                  //do action   
            }, 
            error: function(){ 
                  // do action 
            } 
        });*/ 
    }); 
    $(".pedidos_mesaguardar").on("click",function(){ 
        $.post( 
            $(this).val(),  
            { 
                idpedido: $("#selectidpedido").val(),
                idmesa: $("#selectidmesa").val(),
                cuenta: $("#selectcuenta").val(),
                nombrecuenta:$("#selectnombre").val()

                /*

                iddetallepedido: $("#inputdetallepedido").val(), 
                idusuario: $("#selectusuario").val(),
                fechahora: $(".inputfecha").val()
                */
             }, 
            function(data, status){ 
            alert("Data: " + data + "\nStatus: " + status); 
          }); 
    }); 
});