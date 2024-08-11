import { StoryType } from "@/types/storyType";
import { Progress } from "../ui/progress";
import { ReactNode } from "react";

export default function DominanChart({ data }: { data: StoryType[] }) {
  //get the most dominant feeling
  const dominantFeeling = data.reduce((acc: any, curr) => {
    const feeling: string = curr.feel;
    acc[feeling] = acc[feeling] ? acc[feeling] + 1 : 1;
    return acc;
  }, {});

  //addition the dominantFeeling value
  const totalSum: number = (Object.values(dominantFeeling) as number[]).reduce(
    (sum: number, value: number) => sum + value,
    0
  );

  const max = Math.max(...(Object.values(dominantFeeling) as number[]));
  const feeling = Object.keys(dominantFeeling).find(
    (key) => dominantFeeling[key] === max
  );

  return (
    <div className="space-y-8">
      <div className="border border-gray-100 p-6 rounded-md">
        <h3 className="font-semibold mb-2 text-lg">Paling dominan hari ini</h3>
        <div className="w-[100px] h-[100px] rounded-full bg-red-400 flex justify-center items-center text-white text-center">
          {feeling} = {max}
        </div>
      </div>
      <div className="border border-gray-100 p-6 rounded-md">
        <h3 className="font-semibold mb-2 text-lg">Perasaan </h3>
        <div className="space-y-4">
          {Object.entries(dominantFeeling).map(([emotion, value], i) => (
            <div key={i}>
              <div className="flex justify-between">
                <p>{emotion}</p>
                <p>{value as ReactNode}</p>
              </div>
              <Progress
                value={Math.floor(((value as number) * 100) / totalSum)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
