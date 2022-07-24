$(".guardar").on("click",function(){
    $.post(
        $(this).val(),
        {
            idDetalle: $("#").val(),
            usuario: $("#").val(),
            fechahora: $("#").val(),
            identrega: $("#").val()
        }
    )
})