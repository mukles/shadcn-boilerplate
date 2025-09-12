import { cn } from "@/lib/utils";
import { iconMap, MenuItem } from "@/types";
import Link from "next/link";

export default function NavLink({
  item,
  className,
}: {
  item: MenuItem;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "hover:bg-muted hover:text-accent-foreground flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
        className,
      )}
      href={item.url}
    >
      <div className="text-foreground">
        {item.icon ? iconMap[item.icon as string] : null}
      </div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}
