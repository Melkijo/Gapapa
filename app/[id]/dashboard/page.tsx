import UserSidebar from "@/components/UserSidebar";
import ButtonAddStory from "@/components/dashboard/ButtonAddStory";
import StoryList from "@/components/dashboard/StoryList";
import { exampleData } from "@/data/dummyData";
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
export default async function Page() {
  await loginIsRequiredServer();

  const session = await getServerSession(authConfig);
  return (
    <UserSidebar>
      <div className="mb-6">
        <h2 className="font-bold text-2xl">
          Bagaimana hari ini {session?.user?.name}?
        </h2>
        <p>Cerita aja yaa, jangan di pendem pendem</p>
      </div>
      <ButtonAddStory />

      <div className="my-4">
        <hr />
      </div>
      <div>
        <StoryList stories={exampleData} />
      </div>
    </UserSidebar>
  );
}
