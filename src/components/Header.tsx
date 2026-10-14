import { NavLink } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";

const links = [
  { to: "/", label: "Главная", end: true },
  { to: "/profile", label: "Профиль", end: false },
  { to: "/upgrade", label: "Апгрейд", end: false },
];

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-zinc-950 text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="text-xl font-bold tracking-tight">
          MyApp
        </NavLink>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <ProfileComponent />
      </div>
    </header>
  );
}
