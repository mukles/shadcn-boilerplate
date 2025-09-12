"use client";

import menuConfig from "@/config/menu.json";
import { MenuItem } from "@/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";
import { Button, buttonVariants } from "../ui/button";
import AuthenticationButton from "./authentication-button";
import MobileNavigation from "./mobile-navigation";

export default function NavigationMenuBar() {
  return (
    <section className="py-4">
      <header>
        <div className="container">
          <nav className="hidden justify-between lg:flex">
            <Logo />
            <ul className="flex items-center">
              {menuConfig.menu.map((menu, i) => {
                return <RenderLink key={i} item={menu} />;
              })}
            </ul>

            <AuthenticationButton />
          </nav>

          <MobileNavigation />
        </div>
      </header>
    </section>
  );
}

function RenderLink({
  item,
  className,
}: {
  item: MenuItem;
  className?: string;
}) {
  if (Array.isArray(item.children) && item.children.length) {
    return (
      <li key={item.title} className="group relative">
        <Button variant="ghost" className="static flex items-center gap-1">
          {item.title}
          <ChevronDown className="h-4 w-4" />
        </Button>
        <ul className="bg-background pointer-events-none absolute top-full left-0 z-10 min-w-[180px] rounded-md px-2 py-2 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
          {item.children.map((subItem) => (
            <RenderLink
              item={subItem}
              key={subItem.title}
              className="w-full justify-start text-left"
            />
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li key={item.title}>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: className,
        })}
        href={item.url}
      >
        {item.title}
      </Link>
    </li>
  );
}
