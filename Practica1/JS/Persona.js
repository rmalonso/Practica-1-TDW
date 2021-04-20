function crearPersona(){
    let persona = {
        nombre : document.getElementById("namePersona").value,
        fechaNac : document.getElementById("fechaNacPersona").value,
        fechaDef : document.getElementById("fechaDefPersona").value,
        imagen : document.getElementById("imagenPersona").value,
        wiki : document.getElementById("wikiPersona").value,
    }
    return persona;
}

function guardarPersona(){
    let persona = crearPersona();
    let personas = traerDatos('personas');
    if(personas.length == 0){
        personas.push(persona);
        miStorage.setItem('personas', JSON.stringify(personas));
        document.location.href="Writer.html";
    }else{
        let existe = false;
        for(let i = 0;i<personas.length;i++){
            if(JSON.stringify(personas[i]) === JSON.stringify(persona))
                existe = true;                           
        }
        if(existe){
            alert('La persona ya existe');
        }else{
            personas[personas.length] = persona;
            miStorage.setItem('personas', JSON.stringify(personas));
            document.location.href="Writer.html";
        }
    }
}
function eliminarPersona(persona){
    let personas = traerDatos('personas');
    let entidades = traerDatos('entidades');
    let productos = traerDatos('productos');
    for(let i = 0; i<personas.length;i++){
        if(JSON.stringify(personas[i]) === JSON.stringify(persona))
        personas.splice( i, 1 );
    }
    miStorage.setItem('personas', JSON.stringify(personas));
    for(i=0; i<entidades.length;i++){
        for(let j=0; j<entidades[i].personasRelacionadas.length;j++){
            if(JSON.stringify(entidades[i].personasRelacionadas[j]) === JSON.stringify(persona))
                entidades[i].personasRelacionadas.splice( j, 1 );
        }        
    }
    miStorage.setItem('entidades',JSON.stringify(entidades));
    for(i=0; i<productos.length;i++){
        for(let j=0; j<productos[i].personasRelacionadas.length;j++){
            if(JSON.stringify(productos[i].personasRelacionadas[j]) === JSON.stringify(persona))
                productos[i].personasRelacionadas.splice( j, 1 );
        }        
    }
    miStorage.setItem('productos', JSON.stringify(productos));
    document.location.href="Writer.html"; 
}

function listarPersonasWritter(){
    let personas = traerDatos('personas');
    let listarPersonas = document.getElementById("listaPersonas"); 
    
    for(i=0;i<personas.length;i++){
        let img = document.createElement("img");
        img.className = "card-img-top img-thumbnail w-100 h-100";
        img.src = personas[i].imagen;
        
        let titulo = document.createElement("h5");
        titulo.className = "card-title text-dark";
        let cardDiv = document.createElement("div");
        let cardBody = document.createElement("div");
        cardDiv.className = "card m-1 p-2";
        cardDiv.style= "width: 17rem;";
        cardBody.className = "card-body";
        
        let titleCard = document.createTextNode(personas[i].nombre);
        titulo.appendChild(titleCard);
        let detalles = document.createElement("a");
        detalles.className = "btn btn-primary";
        detalles.setAttribute('onclick', "mostrarDetalles("+JSON.stringify(personas[i])+");");
        let tituloDetalles = document.createTextNode("Detalles");
        detalles.appendChild(tituloDetalles);

        let editar = document.createElement("a");
        editar.className = "btn btn-secondary btn-sm m-1";
        editar.setAttribute('onclick', "editarObjeto("+JSON.stringify(personas[i])+");");
        let tituloEditar = document.createTextNode("Editar");
        editar.appendChild(tituloEditar);

        let eliminar = document.createElement("a");
        eliminar.className = "btn btn-danger btn-sm";
        eliminar.setAttribute('onclick', "eliminarPersona("+JSON.stringify(personas[i])+");");
        let tituloEliminar = document.createTextNode("Eliminar");

        eliminar.appendChild(tituloEliminar);
        cardBody.appendChild(titulo);
        cardBody.appendChild(detalles);
        cardBody.appendChild(editar);
        cardBody.appendChild(eliminar);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        listarPersonas.appendChild(cardDiv)
    }
}

function listarPersonasReader(){
    let personas = traerDatos('personas');
    let listarPersonas = document.getElementById("listaPersonas"); 
    
    for(i=0;i<personas.length;i++){
        let img = document.createElement("img");
        img.className = "card-img-top img-thumbnail w-100 h-100";

        let titulo = document.createElement("h5");
        titulo.className = "card-title text-dark";

        let cardDiv = document.createElement("div");
        let cardBody = document.createElement("div");

        cardDiv.className = "card m-1 p-2";
        cardDiv.style= "width: 17rem;";
        cardBody.className = "card-body";
        img.src = personas[i].imagen;
        let titleCard = document.createTextNode(personas[i].nombre);
        titulo.appendChild(titleCard);

        let detalles = document.createElement("a");
        detalles.className = "btn btn-primary";
        detalles.setAttribute('onclick', "mostrarDetalles("+JSON.stringify(personas[i])+");");
        let tituloDetalles = document.createTextNode("Detalles");

        detalles.appendChild(tituloDetalles);
        cardBody.appendChild(titulo);
        cardBody.appendChild(detalles);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        listarPersonas.appendChild(cardDiv);
    }
}