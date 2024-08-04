import Link from "next/link";
import {
  ChartDashboardIcon,
  Logo,
  PermainanDashboardIcon,
  UtamaDasboardIcon,
} from "./icon";
import { UserDropdown } from "./UserDropdown";

export default function UserSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex flex-col gap-12 py-4 ps-4 pe-12 bg-[#F9F9F9] h-[100vh] w-80 mr-20 ">
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
          {/* <Link
            href="/1/dashboard/permainan"
            passHref
            className="items-center flex gap-4"
          >
            <PermainanDashboardIcon />
            <span>Permainan</span>
          </Link> */}
          <Link href="/1/chart" passHref className="items-center flex gap-4">
            <ChartDashboardIcon />
            <span>Chart</span>
          </Link>
        </div>
      </div>
      <div className="w-full pe-8 pt-4 ">
        <div className="flex justify-end">
          <UserDropdown />
        </div>

        {children}
      </div>
    </div>
  );
}
