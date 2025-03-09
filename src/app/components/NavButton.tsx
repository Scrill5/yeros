import Link, { LinkProps } from "next/link";

type NavButtonProps = LinkProps & {
  children?: string;
};

export default function NavButton(props: NavButtonProps) {
  return (
    <Link
      {...props} 
      className={"hover:text-amber-500 p-1 rounded-md transition-all duration-500 active:scale-95"}
    >
      {props.children}
    </Link>
  );
}
