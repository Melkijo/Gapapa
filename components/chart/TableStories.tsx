"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import { StoryType } from "@/types/storyType";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "react-markdown";
import StoryText from "../dashboard/StoryText";
import Image from "next/image";

export default function TableStories({
  data,
  email,
}: {
  data: StoryType[];
  email: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sort the data by date in descending order
  const sortedData = [...data].sort(
    (a, b) => new Date(b.storyDate).getTime() - new Date(a.storyDate).getTime()
  );

  // Calculate the indices for slicing the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(sortedData.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteStory = (id: string) => {
    console.log(id);
    console.log(email);
    const docRef = doc(db, email, id);
    deleteDoc(docRef);
  };
  return (
    <div className="md:px-0 px-4">
      <Table className="mb-8 w-full">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>

            <TableHead>Tanggal</TableHead>
            <TableHead>Perasaan</TableHead>
            <TableHead className="  hidden md:block">Cerita</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{indexOfFirstItem + i + 1}</TableCell>
              <TableCell className="font-normal md:font-medium">
                {item.storyDate}
              </TableCell>
              <TableCell>{item.feel}</TableCell>
              <TableCell className="hidden md:block">
                <p className="line-clamp-2 ">{item.story}</p>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 md:gap-4 ">
                  <Dialog>
                    <DialogTrigger className={buttonVariants()}>
                      Lihat
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex gap-6 flex-col md:flex-row ">
                        <div className="space-y-2 mt-4 md:mt-0">
                          <div className="w-full">
                            {item.photo === "" ? (
                              <div className="w-full md:w-[300px] h-[200px] md:h-[400px] bg-gray-200 rounded-md"></div>
                            ) : (
                              <Image
                                src={item.photo}
                                alt="image"
                                width={400}
                                height={200}
                                className="w-[800px] h-[200px] md:h-[400px] object-cover rounded-md"
                              />
                            )}
                          </div>
                          <div className="w-full flex justify-between">
                            <h5 className="font-semibold">Perasaan:</h5>
                            <p>{item.feel}</p>
                          </div>
                          <div className="w-full flex justify-between">
                            <h5 className="font-semibold">Tanggal:</h5>
                            <p>{item.storyDate}</p>
                          </div>
                        </div>
                        <ScrollArea className="h-[200px] md:h-[500px] w-full rounded-md pe-4 ">
                          <div className="flex flex-col">
                            <div className="mb-4">
                              <h5 className="font-semibold">Cerita</h5>
                              <StoryText text={item.story} />
                            </div>
                            <div>
                              <h5 className="font-semibold">AI</h5>
                              <Markdown className="w-full border border-gray-100 bg-gray-50 py-2 px-4 rounded-md mt-2">
                                {item.recommendation
                                  ? item.recommendation
                                  : "Belum ada rekomendasi"}
                              </Markdown>
                            </div>
                          </div>
                        </ScrollArea>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger className={buttonVariants()}>
                      Hapus
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            onClick={() => handleDeleteStory(item.id)}
                            variant="destructive"
                          >
                            Hapus
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-4 justify-end ">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
