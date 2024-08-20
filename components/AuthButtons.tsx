"use client";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "./icon";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };
  return (
    <button
      onClick={handleClick}
      className="flex gap-4 items-center border border-gray-300 rounded-lg py-2  justify-center hover:bg-gray-200"
    >
      <GoogleIcon />
      <p className="font-medium">Login with Google</p>
    </button>
  );
}
