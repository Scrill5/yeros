"use client";

import Link from "next/link";
import GButton from "./components/GButton";
import AppButton from "./components/GButton";
import NavButton from "./components/NavButton";
import { useState } from "react";
import { mockNews, mockLatestGames } from "./api/mockData";

export default function Home() {
  const [latestGames, setLatestGames] = useState(mockLatestGames);
  const [news, setNews] = useState(mockNews);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div
        className="relative h-[60vh]"
        style={{
          background: `url(https://media.wired.com/photos/5fc597f0a0c817edec9eeaf8/master/pass/games_streaming.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#131313db] to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-10">
          <h1 className="text-6xl font-black text-white mb-4 hover:scale-125 origin-bottom-left transition-all duration-500 cursor-default">
            Bienvenido a Yeros
          </h1>
          <p className="text-2xl text-neutral-200 mb-8 hover:scale-125 origin-bottom-left transition-all duration-500 cursor-default">
            Descubre los mejores juegos y noticias del mundo del gaming
          </p>
          <div className="flex gap-4">
            <Link href="/games" className="flex-1">
              <GButton>Ver Juegos</GButton>
            </Link>
            <Link href="/login" className="flex-1">
              <GButton>Iniciar Sesión</GButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Sección de Noticias */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Últimas Noticias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((newsItem, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {newsItem.title}
                </h3>
                <p className="text-neutral-400 mb-4">
                  {newsItem.description}
                </p>
                <Link
                  href={newsItem.url}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Leer más →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Juegos Recientes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Últimos Juegos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestGames.map((game) => (
              <div
                key={game.id}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {game.title}
                  </h3>
                  <p className="text-neutral-400 mb-2">
                    {game.genre}
                  </p>
                  <p className="text-neutral-300 text-sm">
                    {game.short_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
