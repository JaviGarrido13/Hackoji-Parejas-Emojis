"use strict"

const emojis = ["😀",'🐱', '🍎', '🚗', '⚽', '🌈', '🎩', '🎸']

let cartas = [...emojis, ...emojis]
let intentos = 0
let primeraCarta, segundaCarta
let bloqueado = false;

cartas = cartas.sort(()=> Math.random()-0.5)// ver que hace el Math.random
const tablero = document.getElementById("tablero");

cartas.forEach((emoji, index)=>{
    const carta=document.createElement("div"); //creamos elemento div por cada carta.
    carta.classList.add("carta");               //añadimos la clase carta al div
    carta.dataset.emoji=emoji;                  
    carta.dataset.index=index;
    carta.addEventListener("click", girarCarta) //evento de click
    tablero.append(carta);
});

function girarCarta(){
    if (bloqueado) return;
    const cartaSelecionada = event.target
    if (cartaSelecionada === primeraCarta) return

    cartaSelecionada.classList.add("revelada")
    cartaSelecionada.textContent = cartaSelecionada.dataset.emoji

    if(!primeraCarta){
        primeraCarta = cartaSelecionada
        return
    }
    segundaCarta = cartaSelecionada
    comprobarPareja()
}








/*  const cards = document.querySelectorAll(".card");

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");

  setTimeout(() => {
    currentCard.classList.remove("flipped");
  }, 1000);
};

for (const card of cards) {
  card.addEventListener("click", reveal);
}
 */



/*  .card.flipped .content {
    transform: rotateY( 180deg ) ;
    transition: transform 0.5s;
  } */