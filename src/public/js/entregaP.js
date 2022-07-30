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
            alert("Data: " + data + "\nStatus: " + status);
            window.location.replace("listar")

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
            alert("Data: " + data + "\nStatus: " + status);
            window.location.replace("listar")
        });

});

$(".guardarVentaPedido").on("click",function(){
    $.post(
        $(this).val(),
        {
            numeroPedido: $("#selectPedido").val()
        },
        function(data, status){
           
            alert("Data: " + data + "\nStatus: " + status);
            window.location.replace("listar")
            
        });

});
});