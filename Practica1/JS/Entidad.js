function crearEntidad(){
    let checkboxes = document.querySelectorAll('#divPersonasE input[type="checkbox"]');
    let lstPersonas = JSON.parse(miStorage.getItem('personas'));
    let personasRelacionadas = [];
    checkboxes.forEach(item => {
      if (item.checked) {
        personasRelacionadas.push(lstPersonas[item.name]);        
      }
    });

    let entidad = {
        nombre : document.getElementById("nameEntidad").value,
        fechaNac : document.getElementById("fechaNacEntidad").value,
        fechaDef : document.getElementById("fechaDefEntidad").value,
        imagen : document.getElementById("imagenEntidad").value,
        wiki : document.getElementById("wikiEntidad").value,
        personasRelacionadas : personasRelacionadas,
    }
    return entidad;
}

function guardarEntidad(){
    let entidad = crearEntidad();
    let entidades = traerDatos('entidades');
    if(entidades.length == 0){
        entidades.push(entidad);
        miStorage.setItem('entidades', JSON.stringify(entidades));
        document.location.href="Writer.html";
    }else{
        let existe = false;
        for(let i = 0;i<entidades.length;i++){
            if(JSON.stringify(entidades[i]) === JSON.stringify(entidad))
                existe = true;                           
        }
        if(existe){
            alert('La entidad ya existe');
        }else{
            entidades[entidades.length] = entidad;
            miStorage.setItem('entidades', JSON.stringify(entidades));
            document.location.href="Writer.html";
        }
    }
}
function eliminarEntidad(entidad){
    let entidades = traerDatos('entidades');
    let productos = traerDatos('productos');
    for(let i = 0; i<entidades.length;i++){
        if(JSON.stringify(entidades[i]) === JSON.stringify(entidad))
        entidades.splice( i, 1 );
    }
    miStorage.setItem('entidades', JSON.stringify(entidades));
    for(i=0; i<productos.length;i++){
        for(let j=0; j<productos[i].entidadesRelacionadas.length;j++){
            if(JSON.stringify(productos[i].entidadesRelacionadas[j]) === JSON.stringify(entidad))
            productos[i].entidadesRelacionadas.splice( j, 1 );
        }        
    }
    miStorage.setItem('productos', JSON.stringify(productos));
    document.location.href="Writer.html";    
}
function listarEntidadesWritter(){
    let entidades = traerDatos('entidades');
    let listaEntidades = document.getElementById("listaEntidades"); 
    
    for(i=0;i<entidades.length;i++){
        let img = document.createElement("img");
        img.className = "card-img-top img-thumbnail w-100 h-100";
        img.src = entidades[i].imagen;

        let titulo = document.createElement("h5");
        titulo.className = "card-title text-dark";
        let cardDiv = document.createElement("div");
        let cardBody = document.createElement("div");
        cardDiv.className = "card m-1 p-2";
        cardDiv.style= "width: 17rem;";
        cardBody.className = "card-body";
        
        let titleCard = document.createTextNode(entidades[i].nombre);
        titulo.appendChild(titleCard);

        let detalles = document.createElement("a");
        detalles.className = "btn btn-primary";
        detalles.setAttribute('onclick', "mostrarDetalles("+JSON.stringify(entidades[i])+");");
        let tituloDetalles = document.createTextNode("Detalles");
        detalles.appendChild(tituloDetalles);

        let editar = document.createElement("a");
        editar.className = "btn btn-secondary btn-sm m-1";
        editar.setAttribute('onclick', "editarObjeto("+JSON.stringify(entidades[i])+");");
        let tituloEditar = document.createTextNode("Editar");
        editar.appendChild(tituloEditar);

        let eliminar = document.createElement("a");
        eliminar.className = "btn btn-danger btn-sm";
        eliminar.setAttribute('onclick', "eliminarEntidad("+JSON.stringify(entidades[i])+");");
        let tituloEliminar = document.createTextNode("Eliminar");
        
        eliminar.appendChild(tituloEliminar);
        cardBody.appendChild(titulo);
        cardBody.appendChild(detalles);
        cardBody.appendChild(editar);
        cardBody.appendChild(eliminar);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        listaEntidades.appendChild(cardDiv)
    }
}

function listarEntidadesReader(){
    let entidades = traerDatos('entidades');
    let listaEntidades = document.getElementById("listaEntidades"); 
    
    for(i=0;i<entidades.length;i++){
        let img = document.createElement("img");
        img.className = "card-img-top img-thumbnail w-100 h-100";
        img.src = entidades[i].imagen;

        let titulo = document.createElement("h5");
        titulo.className = "card-title text-dark";
        let cardDiv = document.createElement("div");
        let cardBody = document.createElement("div");
        cardDiv.className = "card m-1 p-2";
        cardDiv.style= "width: 17rem;";
        cardBody.className = "card-body";
        
        let titleCard = document.createTextNode(entidades[i].nombre);
        titulo.appendChild(titleCard);

        let detalles = document.createElement("a");
        detalles.className = "btn btn-primary";
        detalles.setAttribute('onclick', "mostrarDetalles("+JSON.stringify(entidades[i])+");");
        let tituloDetalles = document.createTextNode("Detalles");
        detalles.appendChild(tituloDetalles);

        cardBody.appendChild(titulo);
        cardBody.appendChild(detalles);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        listaEntidades.appendChild(cardDiv);
    }
}

function cargarReferenciasEntidad() {
    let lstPersonas = JSON.parse(miStorage.getItem('personas'));
    let divPersonas = $('#divPersonasE').empty();
    let htmlText;
    if (lstPersonas.length > 0) {
        htmlText = '<label class="form-label pt-3">Personas</label>';
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
}