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
                if (status == 'success') {
                    window.location.replace("listar");
                    //alert("Data: " + data + "\nStatus: " + status);
                    $(document).Toasts('create', {
                      class: 'bg-success',
                      title: 'Pedido Creado',
                      subtitle: '',
                      body: 'El pedido elaborado se ha creado correctamente',
                    })
     
                  } else {
                    $(document).Toasts('create', {
                      class: 'bg-danger',
                      title: 'Pedido Eliminado',
                      subtitle: '',
                      body: 'El pedido elaborado no se ha creado correctamente',
                    })
                    console.log("Error" + data.message);
                  }
    
          }); 
    }); 


    

});