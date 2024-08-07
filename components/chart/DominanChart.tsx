import { Progress } from "../ui/progress";

export default function DominanChart() {
  return (
    <div className="space-y-8">
      <div className="border border-gray-100 p-6 rounded-md">
        <h3 className="font-semibold mb-2 text-lg">Paling dominan hari ini</h3>
        <div className="w-[100px] h-[100px] rounded-full bg-red-400 flex justify-center items-center text-white">
          Senang
        </div>
      </div>
      <div className="border border-gray-100 p-6 rounded-md">
        <h3 className="font-semibold mb-2 text-lg">Perasaan </h3>
        <div className="space-y-4">
          <div>
            <p>Senang</p>
            <Progress value={63} />
          </div>
          <div>
            <p>Netral</p>
            <Progress value={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
