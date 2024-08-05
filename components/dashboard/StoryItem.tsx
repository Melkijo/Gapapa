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

export default function StoryItem({
  date,
  time,
  mood,
  color,
}: {
  date: string;
  time: string;
  mood: string;
  color: string;
}) {
  const getBackgroundColor = (mood: string) => {
    switch (mood) {
      case "senang":
        return "bg-red-500 hover:bg-red-600";
      case "sedih":
        return "bg-blue-500 hover:bg-blue-600";
      case "marah":
        return "bg-yellow-500 hover:bg-yellow-600";
      // Add more cases as needed
      default:
        return "bg-gray-200 hover:bg-gray-300"; // Default background color
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`w-full h-[160px] ${getBackgroundColor(
            mood
          )} flex flex-col justify-between border border-gray-400 rounded-lg px-4 py-4 hover:cursor-pointer`}
        >
          <div>
            <p>{date}</p>
            <small>{time}</small>
          </div>
          <div>
            <p>{mood}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex">
          <div>
            <div>
              <Image src={hero} alt="image" width={200} height={200} />
            </div>
            <h5>Cerita</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              eligendi praesentium eum amet. Repellendus similique maxime eaque,
              nisi asperiores et.
            </p>
          </div>
          <div>
            <p>AI</p>
            <p>
              "Kami berkesempatan berbicara dengan Ganiesh, asisten pengajar
              bahasa Korea yang telah mencapai level tertinggi dalam ujian TOPIK
              (TOPIK 6). Ganiesh membagikan pengalamannya dalam belajar bahasa
              Korea dan memberikan berbagai tips serta strategi yang dapat Anda
              terapkan untuk belajar bahasa Korea dengan lebih baik."
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
