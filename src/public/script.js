
var conteoDetallePedidos = 0;
console.log('Hola mundos');

function AgregarFila() {
  $('#detallePedido > tbody:last-child')
    // .append('<tr id="2" ><td><select select class="form-control cmbbuscar1 select2 select2-hidden-accessible" style="width: 100%;" data-select2-id="7" tabindex="-1" aria-hidden="true" name="detallePedido[' + conteoDetallePedidos + '][producto]" class="form-control" ><option value="" selected>Seleccione un valor</option><?php foreach ($this->productos as $subproducto) { ?> <option value="<?php echo $subproducto['codigo'] ?>"><?php echo $subproducto['nombre'] ?></option><?php } ?><td></select><input type="number" step="1" name="detallePedido[' + conteoDetallePedidos + '][cantidad]" class="form-control" placeholder="Escriba la cantidad" required></td><td><select select class="form-control cmbbuscar3 select2 select2-hidden-accessible" style="width: 100%;" data-select2-id="6" ta name="detallePedido[' + conteoDetallePedidos + '][subproducto]"><option value="" selected>Seleccione un valor</option><?php foreach ($this->productos as $producto) { ?> <option value=" <?php echo $producto['codigo'] ?>"><?php echo $producto['nombre'] ?></option><?php } ?> </select></td><td><input type="text" name="detallePedido[' + conteoDetallePedidos + '][notas]" class="form-control" placeholder="Escriba notas" required></td><td><button class="btn btn-danger" type="button" onclick="EliminarFila(2)"><i class="text-white fas fa-backspace"></i></button></td></tr>');
  conteoDetallePedidos++
  $('.cmbbuscar1').select2();
  $('.cmbbuscar3').select2();
};

$(document).ready(function() {
  $('.cmbBuscarEstacion').select2();
  $('.cmbBuscarMesero').select2();
});

function EliminarFila(id) {
  $('#' + id).remove();
};


$(document).ready(function() {
  var cmbModalidad = document.getElementById('modalidad'); //Add button selector
  var wrapper = $('#field_wrapper'); //Input field wrapper
  var fieldMesa = '<div id="mesa" class="col-md-12 row"><div class="form-group col-md-6"><label for="idcliente">N° Mesa</label><select class="form-control cmbbuscarMesa select2 select2-hidden-accessible" style="width: 100%;" data-select2-id="4" tabindex="-1" aria-hidden="true" name="idmesa"><option value="" selected disabled hidden>Seleccione un valor</option>{{#each listaMeseros}}<option value="{{idregistro}}">{{Mesa}}</option>{{/each}}</select></div><div class="form-group col-md-6"><label for="idpedido">Cuenta</label><input type="number" min=0 ste=1 class="form-control" id="cuenta" name="cuenta" placeholder="Cuenta" required></div><div class="form-group col-md-6"><label for="idcliente">Nombre de la Cuenta</label><input type="text" class="form-control" id="nombrecuenta" name="nombrecuenta" placeholder="Nombre de la cuenta" required></div></div>'; //New input field html 
  // var fieldLlevar = '<div id="mesa2" class="col-md-12 row"><div class="form-group col-md-6" data-select2-id="63"><label>Cliente</label><select class="form-control cmbbuscar select2 select2-hidden-accessible" style="width: 100%;" data-select2-id="1" tabindex="-1" aria-hidden="true" name="idcliente"><option value="" selected>Seleccione un valor</option><?php foreach ($this->clientes as $cliente) { ?> <option value=" <?php echo $cliente['idcliente'] ?>"><?php echo $cliente['nombre'] ?></option><?php } ?> </select></div>';
  var x = 1;
  var y = 1;
  var max = 1;

  //Once add button is clicked
  $(cmbModalidad).change(function() {
    var cmbModalidadValor = cmbModalidad.options[cmbModalidad.selectedIndex].text; //Get initial value
    console.log(cmbModalidadValor);
    if (cmbModalidadValor == 'Mesa' && max <= 1) {
      x++;
      $(wrapper).append(fieldMesa);          
      $('.cmbbuscar').select2();
      
      $('.cmbbuscarMesa').select2();
    }
      else {
      x == 0;
      $('#mesa').remove();
    }
    if (cmbModalidadValor == 'Llevar' && max <= 1) {
      x++;
      $(wrapper).append(fieldLlevar);          
      $('.cmbbuscar').select2();
    }
      else {
      x == 0;
      $('#mesa2').remove();
    } //Add field html
  });
});

    