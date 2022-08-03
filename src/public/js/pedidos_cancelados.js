$(document).ready(function($){
    $(".pedidos_canceladosguardar").on("click",function(){
        $.post(
            $(this).val(),
            {
                id: $("#inputid").val(),
                idusuario: $("#inputidusuario").val(),
                fechahora: $("#textfecha").val()
            },
            function(data, status){
                alert("Data: " + data + "\nStatus: " + status);
                window.location.replace("listar");
            });

    });

    

});