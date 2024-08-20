import UserSidebar from "@/components/UserSidebar";
import ButtonAddStory from "@/components/dashboard/ButtonAddStory";
import StoryList from "@/components/dashboard/StoryList";
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";
export default async function Page() {
  await loginIsRequiredServer();

  const session = await getServerSession(authConfig);
  return (
    <UserSidebar>
      <div className="mb-6 px-4">
        <h2 className="font-bold text-2xl mb-2">
          How is today {session?.user?.name}?
        </h2>
        <p>Just tell me, don't keep it bottled up.</p>
      </div>
      <div className="px-4">
        <ButtonAddStory email={session?.user?.email || ""} />

        <div className="my-4">
          <hr />
        </div>
        <div>
          <StoryList email={session?.user?.email || ""} />
        </div>
      </div>
    </UserSidebar>
  );
}
