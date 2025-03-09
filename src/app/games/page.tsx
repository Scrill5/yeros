"use client"; // Marca el componente como del lado del cliente
import { useEffect, useState } from "react";
import GameCard from "./components/GameCard";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);

  async function loadGames() {
    try {
      const response = await fetch("/api/games"); // Solicitud al endpoint de API
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const data: Game[] = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <div>
      <div className="flex gap-4 flex-wrap p-4 m-auto w-[95%]">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}
