"use strict"

const emojis = ["😀",'🐱', '🍎', '🚗', '⚽', '🌈', '🎩', '🎸']

let cartas = [...emojis, ...emojis]
let intentos = 0
let primeraCarta, segundaCarta

cartas = cartas.sort(()=> Math.random())