type AppButtonProps = {
  children?: string;
  loading?: boolean;
};

export default function AppButton(props: AppButtonProps) {
  return (
    <button className={`bg-blue-500  ${props.loading && "animate-pulse"}`}>
      {props.children ? props.children : ""}
    </button>
  );
}
