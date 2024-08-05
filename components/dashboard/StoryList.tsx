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
import { useState } from "react";

const storiesPerPage = 8;

export default function StoryList({ stories }: StoryListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stories.length / storiesPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    console.log(currentPage);
  };

  const displayedStories = stories.slice(
    (currentPage - 1) * storiesPerPage,
    currentPage * storiesPerPage
  );
  //   console.log(displayedStories);
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {displayedStories.map((item) => (
          <div key={item.id}>
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
