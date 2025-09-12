// "use client";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

// import menuConfig from "@/config/menu.json";
// import { MenuItem } from "@/types";
// import Link from "next/link";
// import Logo from "../Logo";
// import AuthenticationButton from "./authentication-button";
// import MobileNavigation from "./mobile-navigation";

// export default function NavigationMenuBar() {
//   return (
//     <section className="py-4">
//       <header>
//         <div className="container">
//           <nav className="hidden justify-between lg:flex">
//             <Logo />
//             <div className="flex items-center">
//               <NavigationMenu viewport={false}>
//                 <NavigationMenuList>
//                   {menuConfig.menu.map((menu) => {
//                     return renderMenuItem(menu);
//                   })}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>

//             <AuthenticationButton />
//           </nav>

//           <MobileNavigation />
//         </div>
//       </header>
//     </section>
//   );
// }

// const renderMenuItem = (item: MenuItem) => {
//   if (Array.isArray(item.children) && item.children.length) {
//     return (
//       <NavigationMenuItem value={item.title}>
//         <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//         <NavigationMenuContent>
//           <ul>
//             <li className="row-span-3">
//               <NavigationMenuLink asChild>
//                 <Link href="/">{item.title}</Link>
//               </NavigationMenuLink>
//             </li>
//           </ul>
//         </NavigationMenuContent>
//       </NavigationMenuItem>
//     );
//   }

//   return (
//     <NavigationMenuItem key={item.title} value={item.title}>
//       <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//         <Link href="/docs">Docs</Link>
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };
