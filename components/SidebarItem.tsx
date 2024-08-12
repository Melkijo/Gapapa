"use client";

import { usePathname } from "next/navigation";
import { ChartDashboardIcon, Logo, MenuIcon, UtamaDasboardIcon } from "./icon";
import Link from "next/link";

export default function SidebarItem() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <>
      <div className=" hidden md:flex flex-col gap-12 pt-8 ps-8 pe-12 bg-white border border-e-[1px] h-[100vh] w-80 mr-16 sticky top-0 ">
        <Link href="/" passHref>
          <Logo />
        </Link>
        <div className="flex gap-6 flex-col">
          <Link
            href="/1/dashboard"
            passHref
            className={`items-center flex gap-4 ${
              isActive("/1/dashboard")
                ? "text-blue-600 font-bold"
                : "font-semibold"
            }`}
          >
            <UtamaDasboardIcon
              color={isActive("/1/dashboard") ? "#207DFF" : "#716B6D"}
            />

            <span className="font-semibold">Utama</span>
          </Link>
          <Link
            href="/1/chart"
            passHref
            className={`items-center flex gap-4 ${
              isActive("/1/chart") ? "text-blue-600 font-bold" : "font-semibold"
            }`}
          >
            <ChartDashboardIcon
              color={isActive("/1/chart") ? "#207DFF" : "#716B6D"}
            />

            <span className="font-semibold">Analitik</span>
          </Link>
        </div>
      </div>
    </>
  );
}
