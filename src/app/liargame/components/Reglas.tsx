"use client";
import { useState } from "react";

function Reglas() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="max-w-xl mx-auto mt-6 text-white">
      <button
        onClick={() => setAbierto(!abierto)}
        className="flex items-center justify-between w-full bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
        aria-expanded={abierto}
        aria-controls="contenido-reglas"
      >
        <span className="font-bold text-lg">Reglas</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            abierto ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {abierto && (
        <div
          id="contenido-reglas"
          className="mt-4 bg-gray-900 p-4 rounded max-h-[500px] overflow-y-auto text-gray-300 text-left"
        >
          <h2 className="text-xl font-semibold mb-3">
            Reglas del Juego LiarGame
          </h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Objetivo del Juego:</strong> El objetivo principal es
              encontrar el tesoro oculto del equipo rival antes de que ellos
              encuentren el tuyo. El primer jugador que descubra el tesoro
              contrario gana la partida.
            </li>
            <li>
              <strong>Preparación:</strong>
              <ul className="list-disc list-inside ml-5">
                <li>
                  Cada jugador debe elegir su nombre antes de iniciar la
                  partida.
                </li>
                <li>
                  Luego, cada jugador selecciona una posición inicial en el
                  tablero donde comenzará su movimiento.
                </li>
                <li>
                  Posteriormente, cada jugador coloca su tesoro en una casilla
                  diferente dentro del tablero. Que tu oponente no te vea!
                </li>
              </ul>
            </li>
            <li>
              <strong>Mecánica del Juego:</strong> El juego se desarrolla por
              turnos alternados entre los dos jugadores (Azul y Rojo). En cada
              turno, el jugador tiene varias acciones disponibles:
              <ul className="list-disc list-inside ml-5">
                <li>
                  <em>Hacer pregunta:</em> Puedes usar esta acción para obtener
                  pistas o información estratégica. Las preguntas son de Sí o
                  No.
                </li>
                <li>
                  <em>Moverse:</em> Puedes desplazarte por el tablero para
                  acercarte a la posición del tesoro rival. Solo 3 casillas por
                  turno. Para subir debes estar en los bordes.
                </li>
                <li>
                  <em>Buscar Tesoro:</em> Puedes intentar buscar el tesoro en la
                  casilla actual. Esta acción consume 1 de energía.
                </li>
                <li>
                  <em>Mover Tesoro:</em> Puedes mover tu propio tesoro a otra
                  posición, también consumiendo 1 de energía.
                </li>
              </ul>
            </li>
            <li>
              <strong>Energía:</strong> Cada jugador comienza con una cantidad
              limitada de energía (3 puntos). Las acciones de buscar y mover
              tesoro consumen energía. Si un jugador se queda sin energía, no
              podrá realizar esas acciones (practicamente pierde).
            </li>
            <li>
              <strong>Condiciones de Victoria:</strong> El jugador que encuentre
              el tesoro rival gana la partida inmediatamente. Si ambos jugadores
              se quedan sin energía y ninguno ha encontrado el tesoro, el juego
              finaliza sin ganador.
            </li>
            <li>
              <strong>Mensajes y Notificaciones:</strong> Cuando un jugador
              encuentra el tesoro rival, aparecerá un mensaje a pantalla
              completa felicitando al ganador. Si la búsqueda no tiene éxito, se
              mostrará un mensaje breve indicando "Tesoro no encontrado". Al
              finalizar el juego sin un ganador por falta de energía, se
              mostrará un mensaje indicando que el juego terminó sin ganador.
            </li>
            <li>
              <strong>Consejos y Estrategias:</strong> Administra bien tu
              energía para no quedarte sin acciones disponibles en momentos
              críticos. Observa los movimientos del rival para deducir posibles
              ubicaciones del tesoro. Aprovecha tus turnos para hacer preguntas
              estratégicas y aumentar tus probabilidades de éxito.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}

export default Reglas;
