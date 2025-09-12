import menuConfig from "@/config/menu.json";
import { iconMap, MenuItem } from "@/types";
import Link from "next/link";
import Logo from "../Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import AuthenticationButton from "./authentication-button";
import DropDownLink from "./drop-down-link";

export default function MobileNavigation() {
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              {iconMap["Menu"]}
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-4">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menuConfig.menu.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                <AuthenticationButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.children && item.children.length > 0) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.children.map((subItem) => (
            <DropDownLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};
