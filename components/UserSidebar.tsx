import Link from "next/link";
import { ChartDashboardIcon, Logo, UtamaDasboardIcon } from "./icon";
import { UserDropdown } from "./UserDropdown";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
export default async function UserSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);

  return (
    <div className="flex ">
      <div className="flex flex-col gap-12 py-4 ps-4 pe-12 bg-[#F9F9F9] h-[100vh] w-80 mr-20 sticky top-0 ">
        <Link href="/" passHref>
          <Logo />
        </Link>
        <div className="flex gap-4 flex-col">
          <Link
            href="/1/dashboard"
            passHref
            className="items-center flex gap-4"
          >
            <UtamaDasboardIcon />
            <span>Utama</span>
          </Link>
          <Link href="/1/chart" passHref className="items-center flex gap-4">
            <ChartDashboardIcon />
            <span>Chart</span>
          </Link>
        </div>
      </div>
      <div className="w-full pe-8 pt-4 ">
        <div className="flex justify-end">
          {}
          <UserDropdown
            image={session?.user?.image || ""}
            fullName={session?.user?.name || ""}
          />
        </div>

        {children}
      </div>
    </div>
  );
}
