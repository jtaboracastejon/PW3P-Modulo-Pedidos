$(document).ready(function($){
    /* $(".pedidosModificar").on("click",function(){
         window.location.replace($(this).val());
        $.ajax({
            url: $(this).val(),
            type: "GET",
            success: function(response){
                  console.log("Adsadads"+response);
            },
            error: function(){
                  console.log("Error");
            }
        }); 
    }); */

    /* $(".buscarPedido").on("click",function(){
        var datam= {
            
          };
        $.ajax({
            url: "/app/pedidos/buscar?id=1",
            type: "GET",
            success: function (data, status) {
                if (status == 'success') {
                  //alert("Data: " + data + "\nStatus: " + status);
                  window.location.replace("buscar?b=0");
                } else {
                  //alert("Data: " + data + "\nStatus: " + status);
                  console.log("Error"+ data.message);
                }
              },
              error: function (data) {
                //console.log(data);
                alert('Error al guardar el pedido');
              }
    vod
  zi(data); console.eil
}); 
    }); */
    
        
    $(".pedidosGuardar").on("click",function(){
         $.post(
            $(this).val(), 
            {
                idmesero: $("#idmesero").val(),
                Estacion: $("#idestacion").val(),
                activo: $("#activo").val(),
                modalidad: $("#modalidad").val(),
                estado: 'AAA',
                
                idmesa: $("#idmesa").val(),
                cuenta: $("#cuenta").val(),
                nombrecuenta: $("#nombrecuenta").val(),

                idcliente: $("#idcliente").val(),
                
                //detallePedido: $("#detallePedido").val(),
            },

                /* nombre: $("#inputNombre").val(),
                descripcion: $("#textareaDescricion").val()  */
            function(data, status){
              if (status == 'success') {
                window.location.replace("listar");
                //alert("Data: " + data + "\nStatus: " + status);
                $(document).Toasts('create', {
                  class: 'bg-success',
                  title: 'Pedido Creado',
                  subtitle: '',
                  body: 'El pedido se ha creado correctamente',
                })

              } else {
                $(document).Toasts('create', {
                  class: 'bg-danger',
                  title: 'El pedido no se ha creado',
                  subtitle: '',
                  body: 'El pedido no se ha creado correctamente',
                })
                console.log("Error" + data.message);
              }
            
          });
    });
});