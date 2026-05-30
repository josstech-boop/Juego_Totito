let casillas = document.querySelectorAll('.btn')
let btnInicio = document.querySelector('.btn-inicio')
let spanTurno = document.querySelector('.turno')
let contenedorGanador = document.querySelector('.contenedor-ganador')
let spanGanador = document.querySelector('.span-ganador')
let reiniciar = document.querySelector('.btn-reiniciar')
let spanGandos_x = document.querySelector('.contador_x ')
let spanGandos_o = document.querySelector('.contador_o ')

let contador = 0
let casillas_x = []
let casillas_o = []
let contador_x = 0
let contador_o = 0
let pintar = []
let ganados_o = 0
let ganados_x = 0


const limpiar = () => {
    spanGanador.textContent = ''
    casillas.forEach(casilla => {
        casilla.disabled = false
        casilla.textContent = ''
        casilla.style.setProperty('background-color', ' rgb(35, 35, 114)')
    })
    contador = 1
    casillas_x = []
    casillas_o = []
    contador_x = 0
    contador_o = 0
    pintar = []

}

const pintarCasillas = () => {
    casillas.forEach(casilla => {
        if (pintar.includes(casilla.id)) {
            casilla.style.setProperty('background-color', ' rgb(72, 72, 180)')
        }
    })
}

const analizarTablero = (arreglo, turno) => {
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        for (let a = 0; a < arreglo.length; a++) {
            console.log(turno)
            if (combinacionesGanadoras[i].includes(Number(arreglo[a]))) {

                if (turno == 'O') {
                    contador_o++
                } else {
                    contador_x++
                }

                pintar.push(arreglo[a])
            }
        }

        if (contador_o == 3 || contador_x == 3) {

            console.log('Pintar:', pintar)

            pintarCasillas()
            return true
        }
        contador_o = 0
        contador_x = 0
        pintar = []
    }

}

const llenarCasillas = (id_casilla, turno) => {

    turno == 'O' ? casillas_o.push(id_casilla) : casillas_x.push(id_casilla)

    let analizar_o = casillas_o.length > 2 ? analizarTablero(casillas_o, turno) : false
    let analizar_x = casillas_x.length > 2 ? analizarTablero(casillas_x, turno) : false

    if (analizar_o == true) {
        desabilitarCasillas()
        console.log(casillas_o)
        return true
    } else if (analizar_x == true) {
        console.log(casillas_x)
        desabilitarCasillas()
        return true
    }
}

const desabilitarCasillas = () => {
    casillas.forEach(casilla => {
        casilla.disabled = true

    })
}

desabilitarCasillas()
reiniciar.disabled = true

btnInicio.addEventListener('click', (event) => {
    console.log('iniciamos')
    btnInicio.disabled = true
    reiniciar.disabled = false
    spanTurno.textContent = 'O'
    casillas.forEach(casilla => {
        casilla.disabled = false
    })
})

casillas.forEach(casilla => {
    casilla.addEventListener('click', (event) => {
        let ganador = false
        event.target.disabled = true

        if (contador % 2 == 0) {
            event.target.className = 'btn fw-bold text-white'
            event.target.textContent = 'O'
            spanTurno.textContent = 'X'
            ganador = llenarCasillas(event.target.id, 'X')

        } else {
            event.target.className = 'btn fw-bold text-white'
            event.target.textContent = 'X'
            spanTurno.textContent = 'O'
            ganador = llenarCasillas(event.target.id, 'O')
        }
        contador++
        if (ganador == true) {
            if (event.target.textContent == 'X') {
                ganados_x++

            } else {
                ganados_o++
            }

            contenedorGanador.className = 'bg-info p-5 mt-5 rounded-5 contenedor-ganador '
            spanGanador.textContent = event.target.textContent
        } else if (contador == 10) {
            contenedorGanador.className = 'bg-info p-5 mt-5 rounded-5 contenedor-ganador '
            spanGanador.textContent = '¡EMPATE!!'
        }
    })
})

reiniciar.addEventListener('click', () => {
    limpiar()
})