"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useRef } from "react";
import LangSwitcher from "./LangSwitcher";
import Link from "next/link";
import { Logo } from "./icon";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
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
            {/* <NavigationMenuItem>
              <div ref={themeSwitcherRef}>
                <LangSwitcher />
              </div>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <Link href="/masuk" legacyBehavior passHref>
                <NavigationMenuLink className="py-2 px-4 hover:bg-gray-200 rounded-sm">
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="registrasi"
                className="py-2.5 px-4 bg-main-yellow hover:bg-yellow-400 text-main-black rounded-sm"
              >
                Try free
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
}
