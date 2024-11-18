"use strict"

const emojis = ["👽",'🚴‍♂️', '🍆', '💾', '🦑', '🌈', '🎩', '🎸']

let cartas = []
let intentos = 0
let primeraCarta = null
let segundaCarta = null
let bloqueado = false;
let parejasEncontradas = 0

const tablero = document.getElementById('tablero')
const btnIniciar = document.getElementById('iniciar')
const btnReiniciar = document.getElementById('reiniciar')
const parrafointentos = document.getElementById('parrafo-intentos')
const contador = document.getElementById('contador')
const modal = document.getElementById('modal')
const cerrarModal = document.getElementById('cerrarModal')
const intentosFinales = document.getElementById('intentosFinales')

btnIniciar.addEventListener('click', iniciarJuego)
btnReiniciar.addEventListener('click', reiniciarJuego)
cerrarModal.addEventListener('click', fueraModal)

function iniciarJuego(){
  btnIniciar.disabled = true
  btnReiniciar.disabled = false // desactivo boton iniciar, activo reiniciar

  intentos = 0
  parejasEncontradas = 0
  contador.textContent = intentos

  cartas = [...emojis, ...emojis]
  cartas.sort(()=>Math.random()-0.5) // duplico cartas y mezclamos

  tablero.innerHTML = '' // Partimos de tablero vacio y metemos cartas
  cartas.forEach((emoji)=>{
    const carta = document.createElement('div')
    carta.classList.add('carta')
    carta.dataset.emoji = emoji
    carta.addEventListener('click', girarCarta)
    tablero.append(carta)
  })
  tablero.style.visibility = "visible";
  parrafointentos.style.visibility = "visible";
}

function reiniciarJuego(){
  intentos = 0
  parejasEncontradas = 0
  contador.textContent = intentos
  primeraCarta = null
  segundaCarta = null
  bloqueado = false

  iniciarJuego() // reinicio valores e inicio el juego
}


function girarCarta(event){
    if (bloqueado) return;

    const cartaSelecionada = event.target

    if (cartaSelecionada === primeraCarta || cartaSelecionada.classList.contains('revelada')) return

    cartaSelecionada.classList.add("revelada")
    cartaSelecionada.textContent = cartaSelecionada.dataset.emoji

    if(!primeraCarta){
        primeraCarta = cartaSelecionada
        return
    }
    segundaCarta = cartaSelecionada
    comprobarPareja()
}

function comprobarPareja(){
    bloqueado = true
    intentos++
    contador.textContent = intentos

    const esPareja = primeraCarta.dataset.emoji === segundaCarta.dataset.emoji

    if(esPareja){
        parejasEncontradas++
        desactivarCartas()
        if(parejasEncontradas === emojis.length){
          mostrarModal() // si las encuentra todas activmaos modal
        }
    } else {
        ocultarCartas()
    }
}

function desactivarCartas() {
    primeraCarta.removeEventListener("click", girarCarta);
    segundaCarta.removeEventListener("click", girarCarta);
    resetearCartas();
}

function ocultarCartas() {
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

function resetearCartas() {
  [primeraCarta, segundaCarta] = [null, null];
  bloqueado = false;
}

let puntosBase = 1000;
let penalizacion = 20
const mensajeFinal =document.getElementById("mensajeFinal")

function calculo() {
  return Math.max(0 , puntosBase-intentos*penalizacion)
}



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
  modal.style.display = 'flex'  // display felx al modal
}

function fueraModal(){
  modal.style.display = 'none'
}
