$(document).ready(function($){
    $(".pedidosDetalleGuardar").on("click",function(){
        var datos = {
            NumeroPedido : $("#numeroPedido").val(),
            CodigoProducto: $("#producto").val(),
            Cantidad: $("#cantidad").val(),
            Notas: $("#notas").val(),
            Cancelado: $("#cancelado").val(),
            Elaborado: $("#elaborado").val(),
            Entregado: $("#entregado").val(),
            Facturado: $("#facturado").val(),
            subproducto:$("#subproducto").val()
        }
        // alert(JSON.stringify(datos))
        $.post(
            $(this).val(), 
            datos,
            function(data, status){
                if (status == 'success') {
                    window.location.replace("listar");
                    //alert("Data: " + data + "\nStatus: " + status);
                    $(document).Toasts('create', {
                      class: 'bg-success',
                      title: 'Pedido Creado',
                      subtitle: '',
                      body: 'El detalle pedido se ha creado correctamente',
                    })
    
                  } else {
                    $(document).Toasts('create', {
                      class: 'bg-danger',
                      title: 'El detalle pedido no se ha creado',
                      subtitle: '',
                      body: 'El detalle pedido no se ha creado correctamente',
                    })
                    console.log("Error" + data.message);
                  }
          });
    });
});