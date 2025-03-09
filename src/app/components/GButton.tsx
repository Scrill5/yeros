import { Url } from "next/dist/shared/lib/router/router";

type GButtonProps = {
  children?: string;
  loading?: boolean;
};

export default function GButton({children,loading}: GButtonProps) {
  return (
    
    <button className="p-2 px-3 font-bold text-white cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 text-xl rounded-3xl transition-colors duration-1000">
      {children ? children : "Start Now"}
    </button>
  );
}
