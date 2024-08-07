import PieChartComponent from "@/components/chart/PieChart";
import UserSidebar from "@/components/UserSidebar";
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DominanChart from "@/components/chart/DominanChart";
import TableStories from "@/components/chart/TableStories";

async function getStories({ email }: { email: string }) {
  const querySnapshot = await getDocs(collection(db, email));
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
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
          <h3 className="font-semibold mb-6 md:-mb-5 text-lg">
            Perasaan hari ini
          </h3>
          <PieChartComponent />
        </div>
        <DominanChart />
      </div>

      <div className="my-4">
        <hr />
        <TableStories data={stories} />
      </div>
    </UserSidebar>
  );
}
