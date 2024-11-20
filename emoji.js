"use strict"

const emojis = ["👽",'🚴‍♂️', '🍆', '💾', '🦑', '🌈', '🎩', '🎸']/* Creamos nuesta array de emojis */

/* Creamos nuestras variables necesarias para nuestro código */
let cartas = []
let intentos = 0
let primeraCarta = null
let segundaCarta = null
let bloqueado = false;
let parejasEncontradas = 0
let puntosBase = 1000;
let penalizacion = 20

/* Creamos nuestras constantes para meter los diferentes elemetos*/
const tablero = document.getElementById('tablero')
const btnIniciar = document.getElementById('iniciar')
const btnReiniciar = document.getElementById('reiniciar')
const parrafointentos = document.getElementById('parrafo-intentos')
const contador = document.getElementById('contador')
const modal = document.getElementById('modal')
const cerrarModal = document.getElementById('cerrarModal')
const intentosFinales = document.getElementById('intentosFinales')
const mensajeFinal =document.getElementById("mensajeFinal")
const btnModoClaro = document.getElementById('modo-claro')
const btnModoOscuro = document.getElementById('modo-oscuro')
const titulo = document.getElementById('titulo')
const controles = document.getElementById('controles')
const footer = document.querySelector('footer')

/* Diferentes eventos del código */
btnModoClaro.addEventListener('click', ()=>{
  document.body.classList.add('modo-claro')
  titulo.classList.add('modo-claro')
  controles.classList.add('modo-claro')
  footer.classList.add('modo-claro')
  btnModoClaro.style.display='none'
  btnModoOscuro.style.display='flex'
})
btnModoOscuro.addEventListener('click', ()=>{
  document.body.classList.remove('modo-claro')
  titulo.classList.remove('modo-claro')
  controles.classList.remove('modo-claro')
  footer.classList.remove('modo-claro')
  btnModoClaro.style.display='flex'
  btnModoOscuro.style.display='none'
})
btnIniciar.addEventListener('click', iniciarJuego)
btnReiniciar.addEventListener('click', reiniciarJuego)
cerrarModal.addEventListener('click', fueraModal)

/* Creamos la función para inicar el juego */
function iniciarJuego(){
  btnIniciar.disabled = true
  btnReiniciar.disabled = false // desactivo boton iniciar, activo reiniciar

  intentos = 0
  parejasEncontradas = 0
  contador.textContent = intentos

  cartas = [...emojis, ...emojis]
  cartas.sort(()=>Math.random()-0.5) // duplico cartas y mezclamos

  tablero.innerHTML = '' // Partimos de tablero vacio y metemos cartas
  cartas.forEach((emoji)=>{/* Recorremos el array de emoji para crear el elemento carta */
    const carta = document.createElement('article')
    carta.classList.add('carta')
    carta.dataset.emoji = emoji
    carta.addEventListener('click', girarCarta)
    tablero.append(carta)
  })
  tablero.style.visibility = "visible";/* Mostramos nuestro tablero y nuestros intentos */
  parrafointentos.style.visibility = "visible";
}

/* Creamos la función que reiniciar el juego */
function reiniciarJuego(){
  intentos = 0
  parejasEncontradas = 0
  contador.textContent = intentos
  primeraCarta = null
  segundaCarta = null
  bloqueado = false

  iniciarJuego() // reinicio valores e inicio el juego
}

/* Creamos la funcion girar carta */
function girarCarta(event){
    if (bloqueado) return; /* Si el tablero esta bloqueado, return (si se estan comprobando dos cartas, no puede girar otra) */

    const cartaSelecionada = event.target /* Capturamos la carta selecionada con event.target */

    if (cartaSelecionada === primeraCarta || cartaSelecionada.classList.contains('revelada')) return /* No permitimos que se selecione la misma carta dos veces */

    cartaSelecionada.classList.add("revelada") /* Añadimos la clase revelada y el textContent */
    cartaSelecionada.textContent = cartaSelecionada.dataset.emoji

    if(!primeraCarta){/* Si no hay primera carta la selecciona como primera carta */
        primeraCarta = cartaSelecionada
        return
    }
    segundaCarta = cartaSelecionada /* Cogemos la segunda carta */
    comprobarPareja() /* Llamamos a la funcion comprobar */
}

/* Creamos la función comprobar */
function comprobarPareja(){
    bloqueado = true  /* Bloquemaos el tablero mientras se comprueban */
    intentos++/* Sumamos intentos */
    contador.textContent = intentos /* Actualizamos los intentos */

    const esPareja = primeraCarta.dataset.emoji === segundaCarta.dataset.emoji /* Si son pareja, guardamos en la constante esPareja */

    if(esPareja){
        parejasEncontradas++ /* Sumamos las parejas encontradas */
        desactivarCartas()/* Si son pareja desactivamos las cartas hasta que finalice el juego */
        if(parejasEncontradas === emojis.length){/* Comprobamos si las parejas encontradas son iguales que la longitud del array emojis para finalizar el juego */
          mostrarModal() /* Si las encuentra todas activamos modal*/
        }
    } else {
        ocultarCartas()/* Si no son pareja las ocultamos de nuevo */
    }
}

/* Creamos función desactivarCartas */
function desactivarCartas() { 
  /* Quitamos los eventos y reseteamos las cartas seleccionadas */
    primeraCarta.removeEventListener("click", girarCarta);
    segundaCarta.removeEventListener("click", girarCarta);
    resetearCartas();
}

/* Creamos función ocultarCartas */
function ocultarCartas() {
  /* Devolvemos las cartas a su estado inicial despues de un segundo, si no son pareja */
  setTimeout(() => {
    primeraCarta.classList.remove("revelada");
    segundaCarta.classList.remove("revelada");
    primeraCarta.textContent = "";
    segundaCarta.textContent = "";
    
  setTimeout(() => {
    resetearCartas();
  }, 500);
},1000);
}

/* Creamos la funcion que resetea las cartas selecionadas */
function resetearCartas() {
  [primeraCarta, segundaCarta] = [null, null];
  bloqueado = false;
}

/* Creamos la funcion que calcula la puntuación */
function calculo() {
  return Math.max(0 , puntosBase-intentos*penalizacion)
}

/* Creamos la funcion que muestra el modal que devuelve el resultado con un escalado de puntuaciones */
function mostrarModal(){
  const puntuacion = calculo () ;
  intentosFinales.textContent = `Intentos: ${intentos}`
  
  if (intentos <= 10){
    mensajeFinal.textContent=`¡¡Tremenndo!! maquina tu puntuación es: ${puntuacion}`;

  } else if (intentos <= 16) {
    mensajeFinal.textContent=`Eres muy normalito, tu puntiación es: ${puntuacion}`;
  } else {
    mensajeFinal.textContent=`Eres un paquete, tu puntiación es: ${puntuacion}`;
  }
  modal.style.display = 'flex'  // display flex al modal
}

/* Creamos la funcion fueraModal */
function fueraModal(){
  modal.style.display = 'none'
}