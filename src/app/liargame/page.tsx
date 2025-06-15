"use client";
import { useState, useEffect } from "react";
import Reglas from "./components/Reglas";

const filas = [6, 5, 4, 3, 2, 1];
const columnas = ["A", "B", "C", "D", "E", "F", "G", "H"];

type Casilla = { fila: number; col: string };

type Jugador = {
  nombre: string;
  color: "rojo" | "azul";
  posInicial: Casilla | null;
  tesoro: Casilla | null;
  energia: number;
};

export default function Juego() {
  const [fase, setFase] = useState<"inicio" | "colocar" | "tesoro" | "juego">(
    "inicio"
  );
  const [nombreAzul, setNombreAzul] = useState("");
  const [nombreRojo, setNombreRojo] = useState("");

  const [jugadores, setJugadores] = useState<{ azul: Jugador; rojo: Jugador }>({
    azul: {
      nombre: "",
      color: "azul",
      posInicial: null,
      tesoro: null,
      energia: 3,
    },
    rojo: {
      nombre: "",
      color: "rojo",
      posInicial: null,
      tesoro: null,
      energia: 3,
    },
  });

  const [turno, setTurno] = useState<"azul" | "rojo">("azul");
  const [mostrarTesoro, setMostrarTesoro] = useState<Casilla | null>(null);

  const iniciarJuego = () => {
    setJugadores((prev) => ({
      azul: { ...prev.azul, nombre: nombreAzul },
      rojo: { ...prev.rojo, nombre: nombreRojo },
    }));
    setFase("colocar");
  };

  const seleccionarCasilla = (fila: number, col: string) => {
    const jugador = jugadores[turno];
    const actualizada: Jugador = { ...jugador };

    if (modoMoverTesoro) {
      const jugador = jugadores[turno];
      // Evitar mover a la misma casilla
      if (jugador.tesoro?.fila === fila && jugador.tesoro?.col === col) return;

      // Actualizar posición del tesoro
      setJugadores((prev) => ({
        ...prev,
        [turno]: { ...prev[turno], tesoro: { fila, col } },
      }));

      // Gastar energía
      setJugadores((prev) => ({
        ...prev,
        [turno]: { ...prev[turno], energia: prev[turno].energia - 1 },
      }));

      setModoMoverTesoro(false);
      setAccionUsada(true);
      alert("Tesoro movido con éxito. Energía gastada.");
      return;
    }

    if (fase === "colocar" && !jugador.posInicial) {
      actualizada.posInicial = { fila, col };
      setJugadores((prev) => ({ ...prev, [turno]: actualizada }));

      // Cambiar de turno o pasar a fase de tesoro
      if (turno === "azul") {
        setTurno("rojo");
      } else {
        setFase("tesoro");
        setTurno("azul");
      }
    } else if (fase === "tesoro" && !jugador.tesoro) {
      actualizada.tesoro = { fila, col };
      setJugadores((prev) => ({ ...prev, [turno]: actualizada }));
      setMostrarTesoro({ fila, col });

      setTimeout(() => {
        setMostrarTesoro(null);

        if (turno === "azul") {
          setTurno("rojo");
        } else {
          setFase("juego");
        }
      }, 1500);
    }
  };

  const esSeleccionada = (fila: number, col: string, color: "azul" | "rojo") =>
    jugadores[color].posInicial?.fila === fila &&
    jugadores[color].posInicial?.col === col;

  const esTesoroVisible = (fila: number, col: string) =>
    mostrarTesoro?.fila === fila && mostrarTesoro?.col === col;

  const [faseTurno, setFaseTurno] = useState<
    "pregunta" | "movimiento" | "accion"
  >("pregunta");
  const [movimientosRestantes, setMovimientosRestantes] = useState(3);
  const [energiaUsada, setEnergiaUsada] = useState(false);
  const [preguntaUsada, setPreguntaUsada] = useState(false);
  const [accionUsada, setAccionUsada] = useState(false); // indica si ya usó buscar o mover tesoro este turno
  const [modoMoverTesoro, setModoMoverTesoro] = useState(false); // activa modo para mover tesoro
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // funcion para movimiento

  const moverJugadorADestino = (fila: number, col: string) => {
    if (faseTurno !== "movimiento") return;

    const actual = jugadores[turno];
    const pos = actual.posInicial;
    if (!pos) return;

    const rival = turno === "azul" ? jugadores.rojo : jugadores.azul;

    const colIndexOrigen = columnas.indexOf(pos.col);
    const colIndexDestino = columnas.indexOf(col);
    const colDiff = Math.abs(colIndexOrigen - colIndexDestino);
    const filaDiff = Math.abs(pos.fila - fila);

    const totalMov = colDiff + filaDiff;

    // ✅ Nueva validación: que tenga suficiente energía para este movimiento
    if (movimientosRestantes < totalMov || movimientosRestantes <= 0) return;

    // No se puede mover más de 3 espacios en total
    if (totalMov > 3) return;

    // Solo en línea recta
    const enLineaRecta = colDiff === 0 || filaDiff === 0;
    if (!enLineaRecta) return;

    // Si quiere subir/bajar, debe estar en borde
    const quiereCambiarFila = filaDiff > 0;
    const estaEnBorde = pos.col === "A" || pos.col === "H";
    if (quiereCambiarFila && !estaEnBorde) return;

    // Movimiento válido
    const actualizado = { ...actual, posInicial: { fila, col } };
    setJugadores((prev) => ({ ...prev, [turno]: actualizado }));
    setMovimientosRestantes((prev) => prev - totalMov);
  };

  const terminarTurno = () => {
    setTurno((prev) => (prev === "azul" ? "rojo" : "azul"));
    setPreguntaUsada(false);
    setEnergiaUsada(false);
    setAccionUsada(false); // Resetea el uso de acción (buscar o mover tesoro)
    setModoMoverTesoro(false); // Desactiva modo mover tesoro por seguridad
    setMovimientosRestantes(3);
    setFaseTurno("pregunta");
  };
  useEffect(() => {
    verificarFinPorEnergia();
  }, [jugadores.azul.energia, jugadores.rojo.energia]);

  function verificarFinPorEnergia() {
    const energiaAzul = jugadores.azul.energia;
    const energiaRojo = jugadores.rojo.energia;

    if (energiaAzul <= 0 && energiaRojo <= 0) {
      setMensajeExito("Jugadores sin energía. No hubo ganador.");

      // Reinicia el juego después de mostrar el mensaje
      setTimeout(() => {
        setFase("inicio");
        setAccionUsada(false);
        setModoMoverTesoro(false);
        setTurno("azul");
        setJugadores({
          azul: {
            nombre: "",
            color: "azul",
            posInicial: null,
            tesoro: null,
            energia: 3,
          },
          rojo: {
            nombre: "",
            color: "rojo",
            posInicial: null,
            tesoro: null,
            energia: 3,
          },
        });
        setMensajeExito(null); // Ocultar mensaje
      }, 5000);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 flex flex-col items-center justify-center">
      {fase === "inicio" && (
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-4xl font-bold">
            Bienvenido a <span className="text-yellow-400">LiarGame</span>
          </h1>
          <p className="text-gray-400 text-lg">
            El juego donde pondrás tu coeficiente a prueba en una carrera de
            engaño, lógica y estrategia.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre Jugador Azul"
              className="px-3 py-2 rounded w-full text-white bg-gray-800 border border-gray-600 placeholder-gray-400"
              value={nombreAzul}
              onChange={(e) => setNombreAzul(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nombre Jugador Rojo"
              className="px-3 py-2 rounded w-full text-white bg-gray-800 border border-gray-600 placeholder-gray-400"
              value={nombreRojo}
              onChange={(e) => setNombreRojo(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white font-bold"
              onClick={iniciarJuego}
              disabled={!nombreAzul || !nombreRojo}
            >
              Iniciar partida
            </button>
          </div>
          <Reglas />
        </div>
      )}

      {fase !== "inicio" && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full mt-6">
          {/* Panel lateral */}
          <div className="w-full max-w-xs border border-gray-700 rounded-xl p-4 space-y-4">
            <h2 className="text-xl font-bold mb-2">Jugadores</h2>
            <div className="flex justify-between text-blue-400">
              <span>{jugadores.azul.nombre}</span>
              <span>⚡ {jugadores.azul.energia}</span>
            </div>
            <div className="flex justify-between text-red-400">
              <span>{jugadores.rojo.nombre}</span>
              <span>⚡ {jugadores.rojo.energia}</span>
            </div>
            <div className="text-sm text-gray-400 mt-4">
              {fase === "colocar" && (
                <p>
                  Selecciona la posición inicial de:{" "}
                  <span
                    className={
                      turno === "azul" ? "text-blue-400" : "text-red-400"
                    }
                  >
                    {turno.toUpperCase()}
                  </span>
                </p>
              )}
              {fase === "tesoro" && (
                <p>
                  Selecciona el tesoro de:{" "}
                  <span
                    className={
                      turno === "azul" ? "text-blue-400" : "text-red-400"
                    }
                  >
                    {turno.toUpperCase()}
                  </span>
                </p>
              )}
              {fase === "juego" && (
                <p>
                  Turno actual:{" "}
                  <span
                    className={
                      turno === "azul" ? "text-blue-400" : "text-red-400"
                    }
                  >
                    {turno.toUpperCase()}
                  </span>
                </p>
              )}
            </div>
            {/* Panel de acciones por turno */}
            <div className="mt-6 w-full">
              <div className="w-full border border-gray-700 rounded-xl p-4 space-y-3">
                <h3 className="text-lg font-bold mb-2">Acciones del Turno</h3>
                <button
                  className={`w-full transition px-3 py-2 rounded ${
                    preguntaUsada
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-600"
                  }`}
                  disabled={preguntaUsada}
                  onClick={() => {
                    if (!preguntaUsada) {
                      setPreguntaUsada(true);
                      setFaseTurno("pregunta");
                    }
                  }}
                >
                  Hacer pregunta
                </button>
                <button
                  className={`w-full transition px-3 py-2 rounded ${
                    movimientosRestantes > 0
                      ? "bg-blue-700 hover:bg-blue-600 cursor-pointer"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                  onClick={() => setFaseTurno("movimiento")}
                  disabled={movimientosRestantes === 0}
                >
                  Moverse ({movimientosRestantes})
                </button>

                <button
                  className={`w-full ${
                    accionUsada || jugadores[turno].energia <= 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-600"
                  } transition px-3 py-2 rounded text-white font-semibold`}
                  disabled={accionUsada || jugadores[turno].energia <= 0}
                  onClick={() => {
                    if (accionUsada || jugadores[turno].energia <= 0) return;

                    const jugador = jugadores[turno];
                    const rivalColor = turno === "azul" ? "rojo" : "azul";
                    const rival = jugadores[rivalColor];

                    if (
                      jugador.posInicial?.fila === rival.tesoro?.fila &&
                      jugador.posInicial?.col === rival.tesoro?.col
                    ) {
                      // Mostrar mensaje de éxito en pantalla completa
                      setMensajeExito(
                        `${jugador.nombre} ha encontrado el tesoro y gana el juego!`
                      );

                      // Reiniciar estado del juego tras un pequeño delay para que el jugador vea el mensaje
                      setTimeout(() => {
                        setFase("inicio");
                        setAccionUsada(false);
                        setModoMoverTesoro(false);
                        setTurno("azul");
                        setJugadores({
                          azul: {
                            nombre: "",
                            color: "azul",
                            posInicial: null,
                            tesoro: null,
                            energia: 3,
                          },
                          rojo: {
                            nombre: "",
                            color: "rojo",
                            posInicial: null,
                            tesoro: null,
                            energia: 3,
                          },
                        });
                        setMensajeExito(null); // Ocultar mensaje al reiniciar
                      }, 3000);
                    } else {
                      // Mostrar mensaje de error pequeño
                      setMensajeError("Tesoro no encontrado");

                      // Gastar energía y continuar
                      setJugadores((prev) => ({
                        ...prev,
                        [turno]: {
                          ...prev[turno],
                          energia: prev[turno].energia - 1,
                        },
                      }));
                      setAccionUsada(true);
                      setFaseTurno("accion");

                      // Ocultar el mensaje de error después de 2 segundos
                      setTimeout(() => setMensajeError(null), 2000);
                    }
                    setTimeout(verificarFinPorEnergia, 0);
                  }}
                >
                  Buscar Tesoro (-1 ⚡)
                </button>

                <button
                  className={`w-full ${
                    accionUsada || jugadores[turno].energia <= 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : modoMoverTesoro
                      ? "bg-yellow-700"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } transition px-3 py-2 rounded text-black font-semibold`}
                  disabled={accionUsada || jugadores[turno].energia <= 0}
                  onClick={() => {
                    if (accionUsada || jugadores[turno].energia <= 0) return;

                    // Activar modo mover tesoro
                    setModoMoverTesoro(true);
                    setFaseTurno("accion");
                    setTimeout(verificarFinPorEnergia, 0);
                  }}
                >
                  Mover Tesoro (-1 ⚡)
                </button>
                <button
                  className="w-full bg-gray-800 hover:bg-gray-700 transition px-3 py-2 rounded mt-3"
                  onClick={terminarTurno}
                  disabled={fase !== "juego"}
                >
                  Terminar turno
                </button>
              </div>
            </div>
          </div>

          {/* Tablero */}

          <div className="grid grid-cols-8 gap-1">
            {filas.map((fila) =>
              columnas.map((col) => {
                const seleccionadaAzul = esSeleccionada(fila, col, "azul");
                const seleccionadaRojo = esSeleccionada(fila, col, "rojo");
                const tesoroVisible = esTesoroVisible(fila, col);

                return (
                  <div
                    key={`${col}${fila}`}
                    onClick={() => {
                      if (fase === "juego" && faseTurno === "movimiento") {
                        moverJugadorADestino(fila, col);
                      } else {
                        seleccionarCasilla(fila, col);
                      }
                    }}
                    className={`w-16 h-16 relative flex items-center justify-center border cursor-pointer transition-colors
    ${tesoroVisible ? "bg-yellow-600" : "bg-gray-800 hover:bg-gray-700"}`}
                  >
                    <span className="absolute bottom-0 left-0 text-[10px] text-gray-400 px-1">
                      {col}
                      {fila}
                    </span>

                    {/* Indicador del jugador azul */}
                    {jugadores.azul.posInicial?.fila === fila &&
                      jugadores.azul.posInicial?.col === col && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full absolute top-1 left-1"></div>
                      )}

                    {/* Indicador del jugador rojo */}
                    {jugadores.rojo.posInicial?.fila === fila &&
                      jugadores.rojo.posInicial?.col === col && (
                        <div className="w-3 h-3 bg-red-500 rounded-full absolute top-1 right-1"></div>
                      )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
      {/* Tesoro no encontrado */}
      {mensajeError && (
        <div className="text-red-500 font-semibold mt-2">{mensajeError}</div>
      )}
      {mensajeExito && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6">
          <div className="bg-yellow-400 text-black p-8 rounded-xl max-w-lg text-center space-y-6">
            <h2 className="text-3xl font-bold">¡Juego finalizado!</h2>
            <p>{mensajeExito}</p>
            <button
              onClick={() => {
                setMensajeExito(null);
                // Reiniciar o cambiar fase según lógica
                setFase("inicio");
                setTurno("azul");
                setJugadores({
                  azul: {
                    nombre: "",
                    color: "azul",
                    posInicial: null,
                    tesoro: null,
                    energia: 3,
                  },
                  rojo: {
                    nombre: "",
                    color: "rojo",
                    posInicial: null,
                    tesoro: null,
                    energia: 3,
                  },
                });
                setAccionUsada(false);
                setModoMoverTesoro(false);
              }}
              className="bg-black text-yellow-400 font-semibold px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
