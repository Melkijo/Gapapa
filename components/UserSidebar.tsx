import Link from "next/link";
import { ChartDashboardIcon, Logo, MenuIcon, UtamaDasboardIcon } from "./icon";
import { UserDropdown } from "./UserDropdown";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
export default async function UserSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);

  return (
    <div className="flex ">
      <SidebarItem />
      <div className="w-full pe-0 md:pe-8 pt-4 ">
        <div className="flex justify-between md:justify-end px-4 mb-4 md:mb-0 ">
          <Sheet>
            <SheetTrigger className="block md:hidden hover:bg-gray-100 rounded-md">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" passHref>
                <Logo />
              </Link>
              <div className="flex gap-4 flex-col mt-8">
                <Link
                  href="/1/dashboard"
                  passHref
                  className="items-center flex gap-4"
                >
                  <UtamaDasboardIcon color="#716B6D" />
                  <span>Utama</span>
                </Link>
                <Link
                  href="/1/chart"
                  passHref
                  className="items-center flex gap-4"
                >
                  <ChartDashboardIcon color="#716B6D" />
                  <span>Analitik</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex justify-end md:justify-between mb-0 md:mb-8 md:items-end">
            <p className="font-normal text-xl hidden md:block">
              {new Date().toDateString()}
            </p>
            <UserDropdown
              image={session?.user?.image || ""}
              fullName={session?.user?.name || ""}
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
