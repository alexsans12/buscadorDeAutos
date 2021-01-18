// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

const fragment = new DocumentFragment();

// Generar un objeto con la busqueda;
const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: ""
}; 

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los automoviles al terminar de cargar la pagina

    // Llena las opciones de años
    llenarSelect();
});


// Event Listener para los select de busqueda
marca.addEventListener("change", (evt) => {
    datosBusqueda.marca = evt.target.value;
    filtrarAuto();
});

year.addEventListener("change", (evt) => {
    datosBusqueda.year = parseInt( evt.target.value );

    filtrarAuto();
});

minimo.addEventListener("change", (evt) => {
    datosBusqueda.minimo = evt.target.value;

    filtrarAuto();
});

maximo.addEventListener("change", (evt) => { 
    datosBusqueda.maximo = evt.target.value;

    filtrarAuto();
});

puertas.addEventListener("change", (evt) => {
    datosBusqueda.puertas = parseInt(evt.target.value);

    filtrarAuto();
});

transmision.addEventListener("change", (evt) => {
    datosBusqueda.transmision = evt.target.value;

    filtrarAuto();
});

color.addEventListener("change", (evt) => {
    datosBusqueda.color = evt.target.value;

    filtrarAuto();
});



// Funciones 
function mostrarAutos(autos) {

    // Elimina el HTML previo
    limpiarHTML();

    autos.forEach( auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement("p"); 

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        // insertar resultado
        fragment.appendChild(autoHTML);
        resultado.appendChild(fragment); 
    } );
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {
    for(let i = max; i > min; i--) {
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        fragment.appendChild(opcion);
    }
    year.appendChild(fragment);
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ). filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    // Muestra la busqueda en el HTML
    if( resultado.length ) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent = "No hay resultados :( , Intenta con otros metodos de búsqueda";
    fragment.appendChild(noResultado);
    resultado.appendChild(fragment);
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if( year ) {
        return auto.year === year;
    }
    return auto; 
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto; 
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if( maximo ) {
        return auto.precio <= maximo;
    }
    return auto; 
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto; 
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto; 
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if( color ) {
        return auto.color === color;
    }
    return auto; 
}
