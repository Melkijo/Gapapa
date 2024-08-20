import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoryText from "./StoryText";
import Markdown from "react-markdown";
import standar from "@/assets/model/standar.png";
import marah from "@/assets/model/marah.png";
import tidakPeduli from "@/assets/model/tidakPeduli.png";
import lebay from "@/assets/model/lebay.png";
export default function StoryItem({
  email,
  feel,
  photo,
  story,
  storyDate,
  recommendation,
  model,
}: {
  email: string;
  feel: string;
  photo: string;
  story: string;
  storyDate: string;
  recommendation: string;
  model: string;
}) {
  const getBackgroundColor = (feel: string) => {
    switch (feel) {
      case "happy":
        return "bg-[#F9FD50] hover:bg-yellow-300";
      case "little happy":
        return "bg-yellow-200 hover:bg-yellow-300";
      case "sad":
        return "bg-[#207DFF] hover:bg-blue-600";
      case "little sad":
        return "bg-blue-400 hover:bg-blue-500";

      default:
        return "bg-[#85EF47] hover:bg-green-500";
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`w-full h-[160px] ${getBackgroundColor(
            feel
          )} flex flex-col justify-between  rounded-lg px-4 py-4 hover:cursor-pointer`}
        >
          <div>
            <p className="font-semibold">{storyDate}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>{feel}</p>
            {model === "standar" ? (
              <Image src={standar} alt="standar" width={50} height={50} />
            ) : model === "angry" ? (
              <Image src={marah} alt="marah" width={50} height={50} />
            ) : model === "ignorance" ? (
              <Image
                src={tidakPeduli}
                alt="tidak peduli"
                width={50}
                height={50}
              />
            ) : model === "overreacting" ? (
              <Image src={lebay} alt="lebay" width={50} height={50} />
            ) : (
              <Image src={standar} alt="standar" width={50} height={50} />
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex gap-6 flex-col md:flex-row ">
          <div className="space-y-2 mt-4 md:mt-0">
            <div className="w-full">
              {photo === "" ? (
                <div className="w-full md:w-[300px] h-[200px] md:h-[400px] bg-gray-200 rounded-md"></div>
              ) : (
                <Image
                  src={photo}
                  alt="image"
                  width={400}
                  height={200}
                  className="w-[800px] h-[200px] md:h-[400px] object-cover rounded-md"
                />
              )}
            </div>
            <div className="w-full flex justify-between">
              <h5 className="font-semibold">Feel:</h5>
              <p>{feel}</p>
            </div>
            <div className="w-full flex justify-between">
              <h5 className="font-semibold">Date:</h5>
              <p>{storyDate}</p>
            </div>
          </div>
          <ScrollArea className="h-[200px] md:h-[500px] w-full rounded-md pe-4">
            <div className="flex flex-col">
              <div className="mb-4">
                <h5 className="font-semibold">Story</h5>
                <StoryText text={story} />
              </div>
              <div>
                <h5 className="font-semibold">AI</h5>
                <Markdown className="w-full border border-gray-100 bg-gray-50 py-2 px-4 rounded-md mt-2">
                  {recommendation ? recommendation : "Belum ada rekomendasi"}
                </Markdown>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
