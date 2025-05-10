import Link from "next/link";
import { Game } from "../../games/page";

type GameCardProps = Game;

export default function GameCard({
  developer,
  freetogame_profile_url,
  game_url,
  genre,
  id,
  platform,
  publisher,
  release_date,
  short_description,
  thumbnail,
  title
}: GameCardProps) {
  return (
    <Link
      href={game_url}
      className="bg-neutral-800 rounded-md w-full max-w-90 overflow-hidden
    flex flex-col gap-1 cursor-pointer min-h-60 justify-end border border-neutral-900"
      style={{
        background: `url(${thumbnail})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <img src={media.imgs[0]} className="h-44" /> */}

      <div className="p-4 pt-10 bg-gradient-to-t from-[#161616] via-[#1d1d1dcd] hover:scale-125 origin-bottom-left transition-all duration-700">
        <strong>{title}</strong>
        <p className="opacity-50 text-sm">{short_description}</p>
        <p>{developer}</p>
        {Array(5)
          .fill("⭐")
          .map((v) => v)}
      </div>
    </Link>
  );
}
