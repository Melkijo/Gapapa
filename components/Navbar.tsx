"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { Logo } from "./icon";
import { usePathname } from "next/navigation";

export default function Navbar() {
  //check condition if link is not in home page
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center container py-4">
      <Link href="/" passHref>
        <Logo />
      </Link>

      {pathname == "/" && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/masuk" legacyBehavior passHref>
                <NavigationMenuLink className="py-2 px-4 hover:bg-gray-200 rounded-sm">
                  Masuk
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="registrasi"
                className="py-2.5 px-4 bg-main-yellow hover:bg-yellow-400 text-main-black rounded-sm"
              >
                Mulai gratis
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
}
