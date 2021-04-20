function crearProducto(){
    let checkboxesPersonas = document.querySelectorAll('#divPersonasP input[type="checkbox"]');
    let lstPersonas = JSON.parse(miStorage.getItem('personas'));
    let personasRelacionadas = [];
    checkboxesPersonas.forEach(item => {
      if (item.checked) {
        personasRelacionadas.push(lstPersonas[item.name]);        
      }
    });

    let checkboxesEntidades = document.querySelectorAll('#divEntidades input[type="checkbox"]');
    let lstEntidades = JSON.parse(miStorage.getItem('entidades'));
    let entidadesRelacionadas = [];
    checkboxesEntidades.forEach(item => {
      if (item.checked) {
        entidadesRelacionadas.push(lstEntidades[item.name]);        
      }
    });

    let producto = {
        nombre : document.getElementById("nameProducto").value,
        fechaNac : document.getElementById("fechaNacProducto").value,
        fechaDef : document.getElementById("fechaDefProducto").value,
        imagen : document.getElementById("imagenProducto").value,
        wiki : document.getElementById("wikiProducto").value,
        personasRelacionadas : personasRelacionadas,
        entidadesRelacionadas : entidadesRelacionadas,
    }
    return producto;
}

function guardarProducto(){
    let producto = crearProducto();
    let productos = traerDatos('productos');
    

    if(productos.length == 0){
        productos.push(producto);
        miStorage.setItem('productos', JSON.stringify(producto));
        document.location.href="Writer.html";
    }else{
        let existe = false;
        for(let i = 0;i<productos.length;i++){
            if(JSON.stringify(productos[i]) === JSON.stringify(producto))
                existe = true;                           
        }
        if(existe){
            alert('El producto ya existe');
        }else{
            productos[productos.length] = producto;
            miStorage.setItem('productos', JSON.stringify(productos));
            document.location.href="Writer.html";
        }
    }
}
function eliminarProducto(producto){
    let productos = traerDatos('productos');
    for(let i = 0; i<productos.length;i++){
        if(JSON.stringify(productos[i]) === JSON.stringify(producto))
        productos.splice( i, 1 );
    }
    miStorage.setItem('productos', JSON.stringify(productos));
    document.location.href="Writer.html";
    
}
function listarProductosWritter(){
    let productos = traerDatos('productos'); 
    let listarProductos = document.getElementById("listaProductos"); 
    
    for(i=0;i<productos.length;i++){
        let img = document.createElement("img");
        img.className = "card-img-top img-thumbnail";
        img.src = productos[i].imagen;

        let titulo = document.createElement("h5");
        titulo.className = "card-title text-dark";
        let cardDiv = document.createElement("div");
        let cardBody = document.createElement("div");
        cardDiv.className = "card m-1 p-2";
        cardDiv.style= "width: 17rem;";
        cardBody.className = "card-body";
        
        let titleCard = document.createTextNode(productos[i].nombre);
        titulo.appendChild(titleCard);
        
        let detalles = document.createElement("a");
        detalles.className = "btn btn-primary";
        detalles.setAttribute('onclick', "mostrarDetalles("+JSON.stringify(productos[i])+");");
        let tituloDetalles = document.createTextNode("Detalles");
        detalles.appendChild(tituloDetalles);

        let editar = document.createElement("a");
        editar.className = "btn btn-secondary btn-sm m-1";
        editar.setAttribute('onclick', "editarObjeto("+JSON.stringify(productos[i])+");");
        let tituloEditar = document.createTextNode("Editar");
        editar.appendChild(tituloEditar);

        let eliminar = document.createElement("a");
        eliminar.className = "btn btn-danger btn-sm";
        eliminar.setAttribute('onclick', "eliminarProducto("+JSON.stringify(productos[i])+");");
        let tituloEliminar = document.createTextNode("Eliminar");

        eliminar.appendChild(tituloEliminar);
        cardBody.appendChild(titulo);
        cardBody.appendChild(detalles);
        cardBody.appendChild(editar);
        cardBody.appendChild(eliminar);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        listarProductos.appendChild(cardDiv)
    }

}
function listarProductosReader(){
    let productos = traerDatos('productos'); 
    let listarProductos = document.getElementById("listaProductos"); 
    
    for(i=0;i<productos.length;i++){
        let img = document.createElement("img");
        img.className = "card-img-top img-thumbnail w-100 h-100";
        img.src = productos[i].imagen;

        let titulo = document.createElement("h5");
        titulo.className = "card-title text-dark";
        let cardDiv = document.createElement("div");
        let cardBody = document.createElement("div");
        cardDiv.className = "card m-1 p-2";
        cardDiv.style= "width: 17rem;";
        cardBody.className = "card-body";
        
        let titleCard = document.createTextNode(productos[i].nombre);
        titulo.appendChild(titleCard);

        let detalles = document.createElement("a");
        detalles.className = "btn btn-primary";
        detalles.setAttribute('onclick', "mostrarDetalles("+JSON.stringify(productos[i])+");");
        let tituloDetalles = document.createTextNode("Detalles");

        detalles.appendChild(tituloDetalles);
        cardBody.appendChild(titulo);
        cardBody.appendChild(detalles);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        listarProductos.appendChild(cardDiv);
    }
}

function cargarReferenciasProducto() {
    let lstPersonas = JSON.parse(miStorage.getItem('personas'));
    let divPersonas = $('#divPersonasP').empty();
    let htmlText;
    if (lstPersonas.length > 0) {
        htmlText = '<label class="form-label pt-3">Personas involucradas</label>';
        if (lstPersonas.length == 1) {
            htmlText += '<ul class="list-group list-group-flush"><li class="list-group-item"><input name="0" class="form-check-input me-1" type="checkbox"><span class="ps-1">' + lstPersonas[0].nombre + '</span></input></li></ul>';
        } else {
            lstPersonas.forEach(function (persona, index) {
                if (index == 0) {
                    htmlText += '<ul class="list-group list-group-flush"><li class="list-group-item"><input name="' + index + '"class="form-check-input me-1" type="checkbox"><span class="ps-1">' + persona.nombre + '</span></input></li>';
                } else if (index == lstPersonas.length - 1) {
                    htmlText += '<li class="list-group-item"><input name="' + index + '"class="form-check-input me-1" type="checkbox"><span class="ps-1">' + persona.nombre + '</span></input></li></ul>'
                } else {
                    htmlText += '<li class="list-group-item"><input name="' + index + '"class="form-check-input me-1" type="checkbox"><span class="ps-1">' + persona.nombre + '</span></input></li>';
                }
            });
        }
    }
    divPersonas.append(htmlText);

    let lstEntidades = JSON.parse(miStorage.getItem('entidades'));
    var divEntidades = $('#divEntidades').empty();
    let htmlText2;
    if (lstEntidades.length > 0) {
        htmlText2 = '<label class="form-label pt-3">Entidades involucradas</label>';
        if (lstEntidades.length == 1) {
            htmlText2 += '<ul class="list-group list-group-flush"><li class="list-group-item"><input name="0" class="form-check-input me-1" type="checkbox"><span class="ps-1">' + lstEntidades[0].nombre + '</span></input></li></ul>';
        } else {
            lstEntidades.forEach(function (entidad, index) {
                if (index == 0) {
                    htmlText2 += '<ul class="list-group list-group-flush"><li class="list-group-item"><input name="' + index + '"class="form-check-input me-1" type="checkbox"><span class="ps-1">' + entidad.nombre + '</span></input></li>';
                } else if (index == lstEntidades.length - 1) {
                    htmlText2 += '<li class="list-group-item"><input name="' + index + '"class="form-check-input me-1" type="checkbox"><span class="ps-1">' + entidad.nombre + '</span></input></li></ul>'
                } else {
                    htmlText2 += '<li class="list-group-item"><input name="' + index + '"class="form-check-input me-1" type="checkbox"><span class="ps-1">' + entidad.nombre + '</span></input></li>';
                }
            });
        }
    }
    divEntidades.append(htmlText2);
}