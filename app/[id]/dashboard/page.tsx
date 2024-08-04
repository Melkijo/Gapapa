import UserSidebar from "@/components/UserSidebar";
import ButtonAddStory from "@/components/dashboard/ButtonAddStory";
import StoryList from "@/components/dashboard/StoryList";
import { exampleData } from "@/data/dummyData";

export default function Page() {
  return (
    <UserSidebar>
      <div className="mb-6">
        <h2 className="font-bold text-2xl">Bagaimana hari ini?</h2>
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
