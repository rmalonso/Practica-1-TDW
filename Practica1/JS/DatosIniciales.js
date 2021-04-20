let personaInic = {
    nombre: 'Tim Berners Lee',
    fechaNac: '8-6-1955',
    fechaDef: '-',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg',
    wiki: 'https://es.wikipedia.org/wiki/Tim_Berners-Lee',
}
let entidadInic = {
    nombre: 'International Business Machines Corporation',
    fechaNac: '16-6-1911',
    fechaDef: '-',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    wiki: 'https://es.wikipedia.org/wiki/IBM',
    personasRelacionadas: [],
}
let productoInic = {
    nombre: 'CSS',
    fechaNac: '17-12-1996',
    fechaDef: '-',
    imagen: 'https://lenguajecss.com/assets/logo.svg',
    wiki: 'https://es.wikipedia.org/wiki/Hoja_de_estilos_en_cascada',
    personasRelacionadas: [],
    entidadesRelacionadas: [],
}
let userX = {
    alias: 'x',
    pass: 'x'
}
let userY = {
    alias: 'y',
    pass: 'y'
}
let userZ = {
    alias: 'z',
    pass: 'z'
}
let miStorage = window.localStorage;

function cargarDatosIniciales() {
    if (miStorage.getItem('datosCargados') == null) {
        let personas = traerDatos('personas');
        let productos = traerDatos('productos');
        let entidades = traerDatos('entidades');
        let usuarios = traerDatos('usuarios');
        usuarios[0] = userX;
        usuarios[1] = userY;
        usuarios[2] = userZ;
        personas[0] = personaInic;
        productos[0] = productoInic;
        entidades[0] = entidadInic;
        miStorage.setItem('personas', JSON.stringify(personas));
        miStorage.setItem('productos', JSON.stringify(productos));
        miStorage.setItem('entidades', JSON.stringify(entidades));
        miStorage.setItem('usuarios', JSON.stringify(usuarios));

        miStorage.setItem('datosCargados', true);
    }
}