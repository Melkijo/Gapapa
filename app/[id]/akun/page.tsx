import HapusAkunButton from "@/components/akun/HapusAkunButton";
import { Button } from "@/components/ui/button";
import UserSidebar from "@/components/UserSidebar";
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Page() {
  await loginIsRequiredServer();

  const session = await getServerSession(authConfig);
  return (
    <UserSidebar>
      <div className="flex justify-center mt-8">
        <div className="flex justify-center items-center flex-col">
          <Image
            src={session?.user?.image || ""}
            width={150}
            height={150}
            alt="user image"
            className="rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{session?.user?.name}</h1>
          <p className="text-lg text-gray-500">{session?.user?.email}</p>
          <div className="w-full">
            {/* <HapusAkunButton email={session?.user?.email || ""} /> */}
          </div>
        </div>
      </div>
    </UserSidebar>
  );
}
