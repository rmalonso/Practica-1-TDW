function registro(){
    let user = cargarUsuario('alias','pass');
    if(user.alias.length == 0 || user.pass.length == 0){
        alert('Rellene todos los campos');
        location.reload();
    }else{
        let usuarios = traerDatos('usuarios'); 
        if(usuarios.length == 0){
            usuarios.push(user);
            miStorage.setItem('usuarios', JSON.stringify(usuarios));
            document.location.href="Reader.html";
        }else{
            let existe = false;
            for(let i = 0;i<usuarios.length;i++){
                if(usuarios[i].alias == user.alias)
                    existe = true;                           
            }
            if(existe){
                alert('El usuario ya existe');
            }else{
                usuarios[usuarios.length] = user;
                miStorage.setItem('usuarios', JSON.stringify(usuarios));
                document.location.href="Reader.html";
            }
        }
    }
}

function cargarUsuario(alias,pass){
    let user = {
        alias : document.getElementById(alias).value,
        pass : document.getElementById(pass).value
    };
    return user;
}

function comprobarLogin(){
    let user = cargarUsuario('usuario','contra');
    usuarios = JSON.parse(miStorage.getItem('usuarios'));
    let registrado = false;

    for(let i=0; i<usuarios.length; i++){
        if(usuarios[i].alias == user.alias && usuarios[i].pass == user.pass){
            registrado = true;
        }
    }
    if(registrado){
        miStorage.setItem('usuarioActual', JSON.stringify(user));
        window.location.href="Writer.html";
    }else{
        alert('Usuario o contraseña incorrectos');
        location.reload();
    }
}
function saludoUsuario(){
    let usuario = JSON.parse(miStorage.getItem('usuarioActual'));

    let sitioSaludo = document.getElementById("hola");
    let saludo = document.createTextNode('Bienvenido, ' + usuario.alias);
    sitioSaludo.appendChild(saludo);
}