$(document).ready(function($){ 
    // $(".pedidoselaboradosmodificar").on("click",function(){ 
    //     window.location.replace($(this).val()); 
    //     /*$.ajax({ 
    //         url: $(this).val(), 
    //         type: "GET", 
    //         success: function(response){ 
    //               //do action   
    //         }, 
    //         error: function(){ 
    //               // do action 
    //         } 
    //     });*/ 
    // }); 
    $(".pedidoselaboradosguardar").on("click",function(){ 
        $.post( 
            $(this).val(),  
            { 
                iddetallepedido: $("#inputdetallepedido").val(), 
                idusuario: $("#selectusuario").val(),
                fechahora: $(".inputfecha").val()

             }, 
            function(data, status){ 
            alert("Data: " + data + "\nStatus: " + status); 
            window.location.replace("listar");
          }); 
    }); 
});