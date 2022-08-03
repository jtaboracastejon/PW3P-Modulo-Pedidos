$(document).ready(function($){


$(".guardarEntregas").on("click",function(){
    $.post(
        $(this).val(),
        {
            idDetalle: $("#inputdetalle").val(),
            idusuario: $("#selectusuario").val(),
            fechahora: $("#inputfecha").val(),
            identrega: $("#inputentrega").val()
        },
        function(data, status){
            if (status == 'success') {
                window.location.replace("listar");
                //alert("Data: " + data + "\nStatus: " + status);
                $(document).Toasts('create', {
                  class: 'bg-success',
                  title: 'Entrega pedido guardado',
                  subtitle: '',
                  body: 'El pedido se ha creado correctamente',
                })
 
              } else {
                $(document).Toasts('create', {
                  class: 'bg-danger',
                  title: 'Entrega  Eliminado',
                  subtitle: '',
                  body: 'La entrega no se ha guardado correctamente',
                })
                console.log("Error" + data.message);
              }
        });

});

$(".guardarLlevarPedido").on("click",function(){
    $.post(
        $(this).val(),
        {
            idPedido: $("#selectPedido").val(),
            idCliente: $("#selectCliente").val()
        },
        function(data, status){
            if (status == 'success') {
                window.location.replace("listar");
                //alert("Data: " + data + "\nStatus: " + status);
                $(document).Toasts('create', {
                  class: 'bg-success',
                  title: 'Pedido llevar guardado',
                  subtitle: '',
                  body: 'El pedido a llevar se ha guardado correctamente',
                })
 
              } else {
                $(document).Toasts('create', {
                  class: 'bg-danger',
                  title: 'Pedido a llevar Eliminado',
                  subtitle: '',
                  body: 'El pedido a llevar no se ha guardado correctamente',
                })
                console.log("Error" + data.message);
              }

        });

});

$(".guardarVentaPedido").on("click",function(){
    $.post(
        $(this).val(),
        {
            numeroPedido: $("#selectPedido").val()
        },
        function(data, status){
            if (status == 'success') {
                window.location.replace("listar");
                //alert("Data: " + data + "\nStatus: " + status);
                $(document).Toasts('create', {
                  class: 'bg-success',
                  title: 'Pedido venta guardado',
                  subtitle: '',
                  body: 'El pedido venta se ha creado correctamente',
                })
 
              } else {
                $(document).Toasts('create', {
                  class: 'bg-danger',
                  title: 'Pedido venta  Eliminado',
                  subtitle: '',
                  body: 'El pedido venta no se ha guardado correctamente',
                })
                console.log("Error" + data.message);
              }
            
        });

});
});