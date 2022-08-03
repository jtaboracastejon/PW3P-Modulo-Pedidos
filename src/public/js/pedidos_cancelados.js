$(document).ready(function ($) {
    $(".pedidos_canceladosguardar").on("click", function () {
        $.post(
            $(this).val(),
            {
                id: $("#inputid").val(),
                idusuario: $("#inputidusuario").val(),
                fechahora: $("#textfecha").val()
            },
            function (data, status) {
                if (status == 'success') {
                    window.location.replace("listar");
                    //alert("Data: " + data + "\nStatus: " + status);
                    $(document).Toasts('create', {
                        class: 'bg-success',
                        title: 'Pedido Cancelado Creado',
                        subtitle: '',
                        body: 'El pedido se ha creado correctamente',
                    })

                } else {
                    $(document).Toasts('create', {
                        class: 'bg-danger',
                        title: 'Pedido Cancelado no se ha Creado',
                        subtitle: '',
                        body: 'El pedido no se ha creado correctamente',
                    })
                    console.log("Error" + data.message);
                }

            });

    });



});