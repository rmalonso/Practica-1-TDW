function traerDatos(datos){
    if (JSON.parse(miStorage.getItem(datos)) === null) {
        datos = [];
    } else {
        datos = JSON.parse(miStorage.getItem(datos));
    }
    return datos;
}

function editarObjeto(objEditar){
    miStorage.setItem('objEditar', JSON.stringify(objEditar));
    document.location.href="Editar.html";
}

function onLoadWritter(){
    cargarDatosIniciales();
    saludoUsuario();
    listarPersonasWritter();
    listarEntidadesWritter();
    listarProductosWritter();
}

function onLoadReader(){
    cargarDatosIniciales();
    listarPersonasReader();
    listarEntidadesReader();
    listarProductosReader();
}

function onloadDetalles() {
    saludoUsuario();
    let objDetalles = JSON.parse(miStorage.getItem('objDetalles'));

    let sitioImg = document.getElementById("imagen")
    let img = document.createElement("img");
    img.className = "card-img img-thumbnail";
    img.src = objDetalles.imagen;
    sitioImg.appendChild(img);

    let tituloNombre = document.getElementById("Nombre");
    let nombre = document.createTextNode(objDetalles.nombre);
    tituloNombre.appendChild(nombre);

    let sitioFechaNac = document.getElementById("FechaNacimiento");
    let fechaNacimiento = document.createTextNode(objDetalles.fechaNac);
    sitioFechaNac.appendChild(fechaNacimiento);

    let sitioFechaDef = document.getElementById("FechaDefuncion");
    let fechaDefuncion = document.createTextNode(objDetalles.fechaDef);
    sitioFechaDef.appendChild(fechaDefuncion);

    let sitioWiki = document.getElementById("wiki")
    let wiki = document.createElement("a");
    wiki.className = "card-text col-12 col-sm-7 col-md-8 btn-link";
    wiki.href = objDetalles.wiki;
    masInfo = document.createTextNode("Mas Información");
    wiki.appendChild(masInfo);
    sitioWiki.appendChild(wiki);

    if (objDetalles.personasRelacionadas != null && objDetalles.personasRelacionadas.length > 0) {
        let sitioTituloPersonas = document.getElementById("tituloPersonasInvolucradas");
        let tituloPersonas = document.createElement("p");
        let textoTituloPersonas = document.createTextNode("Personas involucradas:");
        tituloPersonas.appendChild(textoTituloPersonas);
        sitioTituloPersonas.appendChild(tituloPersonas);
        let sitioPersonas = document.getElementById("personasInvolucradas");
        for (let i = 0; i < objDetalles.personasRelacionadas.length; i++) {
            let personaRelacionada = document.createElement("a");
            personaRelacionada.className = "btn btn-link";
            personaRelacionada.setAttribute('onclick', "mostrarDetalles(" + JSON.stringify(objDetalles.personasRelacionadas[i]) + ");");
            let nombrePersona = document.createTextNode(objDetalles.personasRelacionadas[i].nombre);
            personaRelacionada.appendChild(nombrePersona);
            sitioPersonas.appendChild(personaRelacionada);
        }

    }
    if (objDetalles.entidadesRelacionadas != null && objDetalles.entidadesRelacionadas.length > 0) {
        let sitioTituloEntidades = document.getElementById("tituloEntidadesInvolucradas");
        let tituloEntidades = document.createElement("p");
        let textoTituloEntidades = document.createTextNode("Entidades involucradas:");
        tituloEntidades.appendChild(textoTituloEntidades);
        sitioTituloEntidades.appendChild(tituloEntidades);
        let sitioEntidades = document.getElementById("entidadesInvolucradas");
        for (let j = 0; j < objDetalles.entidadesRelacionadas.length; j++) {
            let entidadRelacionada = document.createElement("a");
            entidadRelacionada.className = "btn btn-link";
            entidadRelacionada.setAttribute('onclick', "mostrarDetalles(" + JSON.stringify(objDetalles.entidadesRelacionadas[j]) + ");");
            let nombreEntidad = document.createTextNode(objDetalles.entidadesRelacionadas[j].nombre);
            entidadRelacionada.appendChild(nombreEntidad);
            sitioEntidades.appendChild(entidadRelacionada);
        }

    }
}

function mostrarDetalles(objDetalles) {
    miStorage.setItem('objDetalles', JSON.stringify(objDetalles));
    document.location.href = "Detalles.html";
}

function onloadEditar() {
    saludoUsuario();
    let objEditar = JSON.parse(miStorage.getItem('objEditar'));
    let entidades = traerDatos('entidades');
    let productos = traerDatos('productos');

    nombreAnterior = document.getElementById('nameEdit');
    nombreAnterior.setAttribute('placeholder', objEditar.nombre);

    imagenAnterior = document.getElementById('imagenEdit');
    imagenAnterior.setAttribute('placeholder', objEditar.imagen);

    wikiAnterior = document.getElementById('wikiEdit');
    wikiAnterior.setAttribute('placeholder', objEditar.wiki);

    for (let i = 0; i < entidades.length; i++) {
        if (JSON.stringify(entidades[i]) === JSON.stringify(objEditar))
            cargarReferenciasEntidad();
    }
    for (i = 0; i < productos.length; i++) {
        if (JSON.stringify(productos[i]) === JSON.stringify(objEditar))
            cargarReferenciasProducto();
    }
}

function guardarEdit() {
    let objEditar = JSON.parse(miStorage.getItem('objEditar'));
    let entidades = traerDatos('entidades');
    let productos = traerDatos('productos');
    let personas = traerDatos('personas');
    for (let i = 0; i < entidades.length; i++) {
        if (JSON.stringify(entidades[i]) === JSON.stringify(objEditar)) {
            if (document.getElementById("nameEdit").value != ''){
                objEditar.nombre = document.getElementById("nameEdit").value;}
            if (document.getElementById("fechaNacEdit").value != '')
                objEditar.fechaNac = document.getElementById("fechaNacEdit").value;
            if (document.getElementById("fechaDefEdit").value != '')
                objEditar.fechaDef = document.getElementById("fechaDefEdit").value;
            if (document.getElementById("imagenEdit").value != '')
                objEditar.imagen = document.getElementById("imagenEdit").value;
            if (document.getElementById("wikiEdit").value != '')
                objEditar.wiki = document.getElementById("wikiEdit").value;
            let checkboxes = document.querySelectorAll('#divPersonasE input[type="checkbox"]');
            let personasRelacionadas = [];
            checkboxes.forEach(item => {
                if (item.checked) {
                personasRelacionadas.push(personas[item.name]);        
                }
            });
            objEditar.personasRelacionadas = personasRelacionadas;
            entidades[i] = objEditar;
            miStorage.setItem('entidades', JSON.stringify(entidades));
        }
    }
    for (i = 0; i < productos.length; i++) {
        if (JSON.stringify(productos[i]) === JSON.stringify(objEditar)) {
            if (document.getElementById("nameEdit").value != '')
                objEditar.nombre = document.getElementById("nameEdit").value;
            if (document.getElementById("fechaNacEdit").value != '')
                objEditar.fechaNac = document.getElementById("fechaNacEdit").value;
            if (document.getElementById("fechaDefEdit").value != '')
                objEditar.fechaDef = document.getElementById("fechaDefEdit").value;
            if (document.getElementById("imagenEdit").value != '')
                objEditar.imagen = document.getElementById("imagenEdit").value;
            if (document.getElementById("wikiEdit").value != '')
                objEditar.wiki = document.getElementById("wikiEdit").value;
            let checkboxesPersonas = document.querySelectorAll('#divPersonasP input[type="checkbox"]');
            let personasRelacionadas = [];
            checkboxesPersonas.forEach(item => {
                if (item.checked) {
                personasRelacionadas.push(personas[item.name]);        
                }
            });
            let checkboxesEntidades = document.querySelectorAll('#divEntidades input[type="checkbox"]');
            let entidadesRelacionadas = [];
            checkboxesEntidades.forEach(item => {
                if (item.checked) {
                entidadesRelacionadas.push(entidades[item.name]);        
                }
            });
            objEditar.personasRelacionadas = personasRelacionadas;
            objEditar.entidadesRelacionadas = entidadesRelacionadas;
            productos[i] = objEditar;
            miStorage.setItem('productos', JSON.stringify(productos));
        }      
    }
    for(i = 0 ; i<personas.length;i++){
        if (JSON.stringify(personas[i]) === JSON.stringify(objEditar)) {
            if (document.getElementById("nameEdit").value != '')
                objEditar.nombre = document.getElementById("nameEdit").value;
            if (document.getElementById("fechaNacEdit").value != '')
                objEditar.fechaNac = document.getElementById("fechaNacEdit").value;
            if (document.getElementById("fechaDefEdit").value != '')
                objEditar.fechaDef = document.getElementById("fechaDefEdit").value;
            if (document.getElementById("imagenEdit").value != '')
                objEditar.imagen = document.getElementById("imagenEdit").value;
            if (document.getElementById("wikiEdit").value != '')
                objEditar.wiki = document.getElementById("wikiEdit").value;
            personas[i] = objEditar;
            miStorage.setItem('personas', JSON.stringify(personas));
        }
    }
    document.location.href="Writer.html";
}