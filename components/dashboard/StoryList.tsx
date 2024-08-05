"use client";

import StoryItem from "./StoryItem";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { StoryListProps, StoryType } from "@/types/storyType";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getStories({ email }: { email: string }) {
  const querySnapshot = await getDocs(collection(db, email));
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

const storiesPerPage = 8;

export default function StoryList({ email }: { email: string }) {
  const [userStories, setUserStories] = useState<StoryType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await getStories({ email });
      setUserStories(data);
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(userStories.length / storiesPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    console.log(currentPage);
  };

  const displayedStories = userStories.slice(
    (currentPage - 1) * storiesPerPage,
    currentPage * storiesPerPage
  );
  //   console.log(displayedStories);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayedStories.map((item, i) => (
          <div key={i}>
            <StoryItem {...item} />
          </div>
        ))}
      </div>

      <Pagination className="flex justify-end my-8">
        <PaginationContent>
          <PaginationItem>
            {currentPage === 1 ? (
              ""
            ) : (
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  handlePageChange(currentPage - 1);
                }}
                // disabled={currentPage === 1}?
              />
            )}
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  handlePageChange(index + 1);
                }}
                className={currentPage === index + 1 ? "bg-yellow-400" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage === totalPages ? (
              ""
            ) : (
              <PaginationNext
                href="#"
                onClick={(e) => {
                  handlePageChange(currentPage + 1);
                }}
                // disabled={currentPage === totalPages}?
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
