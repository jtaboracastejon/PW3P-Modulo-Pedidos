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
                if (status == 'success') {
                    window.location.replace("listar");
                    //alert("Data: " + data + "\nStatus: " + status);
                    $(document).Toasts('create', {
                      class: 'bg-success',
                      title: 'Pedido Mesa Creado',
                      subtitle: '',
                      body: 'El pedido mesa se ha creado correctamente',
                    })
    
                  } else {
                    $(document).Toasts('create', {
                      class: 'bg-danger',
                      title: 'El pedido mesa no se ha creado',
                      subtitle: '',
                      body: 'El pedido mesa no se ha creado correctamente',
                    })
                    console.log("Error" + data.message);
                  };

          }); 
    }); 
});