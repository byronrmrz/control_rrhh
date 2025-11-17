export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-semibold transition-all
        ${variant === "primary" && "bg-primary mt-10 text-white hover:bg-primary/90"}
        ${variant === "secondary" && "bg-accent text-white hover:bg-accent/90"}
        ${variant === "third" && "bg-third text-white hover:bg-secondary/90"}
        ${variant === "outline" && "border border-primary text-primary hover:bg-primary hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );
}
