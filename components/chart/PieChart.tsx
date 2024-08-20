"use client";
import { PieChart } from "react-minimal-pie-chart";
import { StoryType } from "@/types/storyType";

export default function PieChartComponent({ data }: { data: StoryType[] }) {
  //get the sum of every data feel
  const dominantFeeling = data.reduce((acc: any, curr) => {
    const feeling = curr.feel;
    acc[feeling] = acc[feeling] ? acc[feeling] + 1 : 1;
    return acc;
  }, {});
  const colors = ["#E38627", "#C13C37", "#6A2135", "#8A2BE2", "#FF6347"];

  const pieChartData = Object.entries(dominantFeeling).map(
    ([feeling, count], index) => ({
      label: feeling,
      title: feeling,
      value: count as number, // Explicitly cast count to number
      color: colors[index % colors.length], // Reuse colors if more feelings than colors
    })
  );

  return (
    <>
      <h3 className="font-semibold mb-4  text-lg">Overall feel</h3>
      {/* make the color info */}
      <div className="grid grid-cols-2 mb-6 md:-mb-20">
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors[3] }}
          ></div>
          <p>Sad</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors[1] }}
          ></div>
          <p>Netral</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors[2] }}
          ></div>
          <p>Happy</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors[4] }}
          ></div>
          <p>Little happy</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: colors[0] }}
          ></div>
          <p>Little sad</p>
        </div>
      </div>
      <PieChart data={pieChartData} />
    </>
  );
}
