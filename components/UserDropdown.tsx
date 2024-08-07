"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import proof from "@/assets/hero-proof-1.png";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function UserDropdown({
  image,
  fullName,
}: Readonly<{
  image?: string;
  fullName?: string;
}>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:cursor-pointer hover:opacity-80 rounded-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              width={45}
              height={45}
              className="object-fit"
              alt="user image"
            />
          ) : (
            <Image
              src={proof}
              width={45}
              height={45}
              className="object-fit"
              alt="user image"
            />
          )}
          {/* <Image src={image} width={50} height={50} alt="user image" /> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/1/akun" className="hover:cursor-pointer">
            <DropdownMenuItem>Akun </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
