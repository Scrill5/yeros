"use client"; // Marca el componente como del lado del cliente
import { useEffect, useState } from "react";
import GameCard from "./components/GameCard";

export interface Game {
  id: number;
  title: string;
  genre: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  developer: string;
  publisher: string;
  platform: string;
  release_date: string;
  freetogame_profile_url: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [allGames, setAllGames] = useState<Game[]>([]);

  async function loadGames() {
    try {
      const response = await fetch("/api/games"); // Solicitud al endpoint de API
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const gamesData = await response.json();
      setAllGames(gamesData);
      setGames(gamesData);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredGames = allGames.filter(game => game.genre.toLowerCase() === selectedCategory.toLowerCase());
      setGames(filteredGames);
    } else {
      setGames(allGames);
    }
  }, [selectedCategory]);

  return (
    <div>
      <div className="flex justify-between items-center p-4 m-auto w-[95%]">
        <h1 className="text-2xl font-bold">Juegos</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#0f0f0f] px-3 py-2 border-[#7d7d7d] border-b-[0.3px] hover:bg-neutral-900 rounded-t-sm"
        >
          <option value="">Todas las categorías</option>
          <option value="action">Acción</option>
          <option value="rpg">RPG</option>
          <option value="sports">Deportes</option>
          <option value="strategy">Estrategia</option>
        </select>
      </div>
      <div className="flex gap-4 flex-wrap p-4 m-auto w-[95%]">
        {games.length === 0 ? (
          <div className="text-center p-4">Cargando juegos...</div>
        ) : (
          games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))
        )}
      </div>
    </div>
  );
}
