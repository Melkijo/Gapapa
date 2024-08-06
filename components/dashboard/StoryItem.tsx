import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import hero from "@/assets/hero.png";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StoryItem({
  email,
  feel,
  photo,
  story,
  storyDate,
}: {
  email: string;
  feel: string;
  photo: string;
  story: string;
  storyDate: string;
}) {
  const getBackgroundColor = (feel: string) => {
    switch (feel) {
      case "senang":
        return "bg-red-500 hover:bg-red-600";
      case "sedikit senang":
        return "bg-red-400 hover:bg-red-500";
      case "sedih":
        return "bg-blue-500 hover:bg-blue-600";
      case "sedikit sedih":
        return "bg-blue-400 hover:bg-blue-500";

      default:
        return "bg-gray-200 hover:bg-gray-300"; // Default background color
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`w-full h-[160px] ${getBackgroundColor(
            feel
          )} flex flex-col justify-between border border-gray-400 rounded-lg px-4 py-4 hover:cursor-pointer`}
        >
          <div>
            <p>{storyDate}</p>
          </div>
          <div>
            <p>{feel}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex gap-6 flex-col md:flex-row ">
          <div className="space-y-2 mt-4 md:mt-0">
            <div className="w-full">
              <Image
                src={photo}
                alt="image"
                width={400}
                height={200}
                className="w-[800px] h-[200px] md:h-[400px] object-cover rounded-md"
              />
            </div>
            <div className="w-full flex justify-between">
              <h5 className="font-semibold">Perasaan:</h5>
              <p>{feel}</p>
            </div>
            <div className="w-full flex justify-between">
              <h5 className="font-semibold">Tanggal:</h5>
              <p>{storyDate}</p>
            </div>
          </div>
          <ScrollArea className="h-[200px] md:h-full w-full rounded-md pe-4">
            <div className="flex flex-col">
              <div className="mb-4">
                <h5 className="font-semibold">Cerita</h5>
                <p className="w-full border border-gray-100 bg-gray-50 py-2 px-4 rounded-md mt-2">
                  {story}
                </p>
              </div>
              <div>
                <h5 className="font-semibold">AI</h5>
                <p className="w-full border border-gray-100 bg-gray-50 py-2 px-4 rounded-md mt-2">
                  "Kami berkesempatan berbicara dengan Ganiesh, asisten pengajar
                  bahasa Korea yang telah mencapai level tertinggi dalam ujian
                  TOPIK (TOPIK 6). Ganiesh membagikan pengalamannya dalam
                  belajar bahasa Korea dan memberikan berbagai tips serta
                  strategi yang dapat Anda terapkan untuk belajar bahasa Korea
                  dengan lebih baik."
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
