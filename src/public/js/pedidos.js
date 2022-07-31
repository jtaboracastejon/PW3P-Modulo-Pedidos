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
                /* nombre: $("#inputNombre").val(),
                descripcion: $("#textareaDescricion").val()  */
             },
            function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
            window.location.replace("listar");
          });
    });
});