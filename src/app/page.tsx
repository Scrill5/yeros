import Link from "next/link";
import GButton from "./components/GButton";
import AppButton from "./components/GButton";
import NavButton from "./components/NavButton";

export default function Home() {
  return (
    <div className="">
      <div
        className="flex flex-col justify-end h-100 "
        style={{
          background: `url( https://media.wired.com/photos/5fc597f0a0c817edec9eeaf8/master/pass/games_streaming.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col justify-end bg-gradient-to-t from-[#0F0F0F] via-[#131313db] h-1/2 p-5 cursor-default">
          <p className="text-4xl font-black text-neutral-50/60 hover:scale-125 origin-bottom-left hover:text-white transition-all duration-500">
            Discover the Fun
          </p>
          <p className="text-3xl font-black text-neutral-50/60 hover:scale-125 origin-bottom-left hover:text-white transition-all duration-500">
            Play like a master
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center pt-10">
        <Link href="/games">
          <GButton />
        </Link>
        <Link href="/login">
          <GButton>Login</GButton>
        </Link>
      </div>
    </div>
  );
}
