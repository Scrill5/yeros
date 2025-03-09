"use client";
import NavButton from "@/app/components/NavButton";
import { navRoutes } from "@/routes";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AppMenu({ open, onClose }: Props) {
  return (
    <div
      className={`fixed flex flex-col items-end  w-full top-0 h-full transition-all ${
        !open ? "-right-full" : "right-0"
      } `}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-end bg-[#141414] rounded-bl-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="text-2xl hover:text-amber-500 cursor-pointer p-2 px-5"
        >
          &times;
        </button>

        <div className="flex flex-col items-end p-6 gap-2">
          {navRoutes.map((route) => (
            <NavButton key={route.path} href={route.path}>
              {route.label}
            </NavButton>
          ))}
        </div>
      </div>
    </div>
  );
}
