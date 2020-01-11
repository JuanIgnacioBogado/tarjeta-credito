// Constantes Generales
const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector('#formulario-tarjeta'),
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreTarjeta = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logo-marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#expiracion .mes'),
      yearExpiracion = document.querySelector('#expiracion .year'),
      ccv = document.querySelector('#tarjeta .ccv');


// Volteamos la tarjeta para mostrar el frente
const mostrarFrente = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active')
    }
}


// Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

// Animacion del Boton y mostrar formulario
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');

    formulario.classList.toggle('active');
})


// Select del mes generado dinamicamente
for(let i = 1; i <= 12; i++) {

    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}


// Select del año generado dinamicamente
const yearActual = new Date().getFullYear();

for (let i = yearActual; i <= yearActual + 8; i++) {

    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}


// Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    // Eliminamos espacios en blanco
    .replace(/\s/g, '')

    // Elimina las letras
    .replace(/\D/g, '')

    // Ponemos espacio cada 4 numeros
    .replace(/([0-9]{4})/g, '$1 ')

    // Elimina el ultimo espaciado
    .trim();

    // Ponemos los numeros en ####
    numeroTarjeta.textContent = valorInput;

    // Lo que borremos se resetea en este if
    if(valorInput == '') {
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = ''
    }

    // Detectando si la tarjeta es Visa o Master
    if(valorInput[0] == 4) {

        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);

    } else if (valorInput[0] == 5) {

        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }


    // Volteamos la tarjeta para que el usuario vea el frente
    mostrarFrente();
})


// Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = e.target.value.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == '') {
        nombreTarjeta.textContent = 'Juan Ignacio'
    }

    mostrarFrente();
})


// Select Mes
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
})


// Select Year
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
})


// CCV
formulario.inputCCV.addEventListener('keyup', () => {
    if(!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    // Eliminar los espacios
    .replace(/\s/g, '')

    // Elimina las letras
    .replace(/\D/g, '')

    ccv.textContent = formulario.inputCCV.value
})

