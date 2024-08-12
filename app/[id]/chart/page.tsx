import PieChartComponent from "@/components/chart/PieChart";
import UserSidebar from "@/components/UserSidebar";
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DominanChart from "@/components/chart/DominanChart";
import TableStories from "@/components/chart/TableStories";
import { StoryType } from "@/types/storyType";

async function getStories({ email }: { email: string }) {
  const querySnapshot = await getDocs(collection(db, email));
  const data: Array<StoryType> = [];

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      email: "",
      feel: "",
      photo: "",
      story: "",
      storyDate: "", // Add the storyDate property
      recommendation: "", // Add the recommendation property
      model: "", // Add the model property
      ...doc.data(),
    });
  });
  return data;
}
export default async function Page() {
  await loginIsRequiredServer();

  const session = await getServerSession(authConfig);
  const stories = await getStories({ email: session?.user?.email ?? "" });

  return (
    <UserSidebar>
      <div className="mb-6 px-4">
        <h2 className="font-bold text-2xl">Analisis</h2>
        <p>Cek progres perasaanmu yuks</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 px-4">
        <div className="w-full md:w-[300px] rounded-md border border-gray-100 p-6">
          <PieChartComponent data={stories} />
        </div>
        <DominanChart data={stories} />
      </div>

      <div className="my-4">
        <hr />
        <TableStories data={stories} email={session?.user?.email ?? ""} />
      </div>
    </UserSidebar>
  );
}
