<?php include 'vistas/plantilla/encabezado.php'; ?>
<div class="wrapper">
    <?php
    require 'vistas/plantilla/nav.php';
    require 'vistas/plantilla/menulateral.php';
    require 'vistas/plantilla/contenidotitulo.php';
    ?>
    <!-- Main content -->



    <section class="content-header">
        <div class="container-fluid">
            <h2 class="text-center display-4">Buscar</h2>
        </div>
    </section>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <form action="/detallepedido/buscar" method="post">
                        <div class="input-group input-group-lg">
                            <select class="" id="filtro" name="filtro">
                                <option value="detalle_pedido.NumeroPedido">N° Pedido</option>
                                <option value="p1.Nombre">Producto</option>
                                <option value="detalle_pedido.Cantidad">Cantidad</option>
                                <option value="p2.Nombre">Subproducto</option>
                            </select>
                            <input type="search" id="buscar" name="buscar" class="form-control form-control-lg" placeholder="Buscar" value="">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-lg btn-default">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3"></div>
            <div class="row">
            <div class="col-sm-12">
                    <table class="table m-0">
                      <thead>
                        <tr>
                          <th class="text-center">ID</th>
                          <th class="text-center">NumeroPedido</th>
                          <th class="text-center">Producto</th>
                          <th class="text-center">Cantidad</th>
                          <th class="text-center">Notas</th>
                          <th class="text-center">subproducto</th>
                          <th class="text-center" width=3%>Cancelado</th>
                          <th class="text-center" width=3%>Elaborado</th>
                          <th class="text-center" width=3%>Entregado</th>
                          <th class="text-center" width=3%>Facturado</th>
                          <th class="text-center" width=15%>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php
                        foreach ($this->datos as $detallepedido) {
                        ?>
                          <tr>
                            <td class="text-center"><a href="/detallepedido/buscarid?id=<?php echo $detallepedido['idregistro'] ?>"><?php echo $detallepedido['idregistro'] ?> </a></td>
                            <td class="text-center">

                              <?php echo $detallepedido['NumeroPedidos'] ?></td>
                            <td class="text-center"><?php echo $detallepedido['NombreProducto'] ?></td>
                            <td class="text-center"><?php echo $detallepedido['Cantidad'] ?></td>
                            <td class="text-center"><?php echo $detallepedido['Notas'] ?></td>
                            <td class="text-center"><?php echo $detallepedido['NombreSubproducto'] ?></td>
                            <td class="text-center">
                              <?php
                              if ($detallepedido['Cancelado'] == 0) {
                              ?>
                                <span class="badge badge-danger">NO</span>
                              <?php
                              } else {
                              ?>
                                <span class="badge badge-success">SI</span>
                              <?php
                              }
                              ?>
                            <td class="text-center">
                              <?php
                              if ($detallepedido['Elaborado'] == 0) {
                              ?>
                                <span class="badge badge-danger">NO</span>
                              <?php
                              } else {
                              ?>
                                <span class="badge badge-success">SI</span>
                              <?php
                              }
                              ?>
                            <td class="text-center">
                              <?php
                                if ($detallepedido['Entregado'] == 0) {
                                ?>
                                  <span class="badge badge-danger">NO</span>
                                <?php
                                } else {
                                ?>
                                  <span class="badge badge-success">SI</span>
                                <?php
                                }
                              ?>
                            <td class="text-center">
                              <?php
                                if ($detallepedido['Facturado'] == 0) {
                                ?>
                                  <span class="badge badge-danger">NO</span>
                                <?php
                                } else {
                                ?>
                                  <span class="badge badge-success">SI</span>
                                <?php
                                }
                              ?>
                            <td class="text-center">
                              <a class="btn btn-warning" href="/detallepedido/editar?id=<?php echo $detallepedido['idregistro'] ?>"><i class="text-white fas fa-edit"></i></a>
                              <a class="btn btn-danger" href="/detallepedido/eliminar?id=<?php echo $detallepedido['idregistro'] ?>" onclick="return confirm('Estas seguro de eliminar?')"><i class="fas fa-trash"></i></a>
                            </td>
                          </tr>
                        <?php
                        }
                        ?>
                      </tbody>
                    </table>
                  </div>
                
            </div>
        </div>
    </section>
                <?php 
                if($this->datos == null){
                    $msj=
                    '<section class="content-header">
                        <div class="container-fluid">
                            <h5 class="text-center display">No existen datos que coincidan con la busqueda</h5>
                        </div>
                    </section>';
                    echo $msj;
                }
                ?>


    <!-- /.content -->
    <?php include 'vistas/plantilla/pie.php'; ?>
    <!-- Aqui agregar script adicionales -->
    <?php include 'vistas/plantilla/script.php'; ?>