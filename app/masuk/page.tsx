"use client";

import { FacebookIcon, GoogleIcon } from "@/components/icon";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import masuk from "@/assets/masuk.png";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex gap-20 items-center">
          <div className="w-[500px]">
            <h2 className="text-2xl font-bold text-center mb-4">Masuk</h2>
            <div className="flex flex-col  gap-2">
              <button
                onClick={() => signIn("google")}
                className="flex gap-4 items-center border border-gray-300 rounded-lg py-2 px-[100px] justify-center"
              >
                <GoogleIcon />
                <p className="font-medium">Masuk dengan Google</p>
              </button>
              <div className="flex gap-4 items-center border border-gray-300 rounded-lg py-2 px-[100px] justify-center">
                <FacebookIcon />
                <p className="font-medium">Masuk dengan Facebook</p>
              </div>
              <Link href="/1/dashboard">
                <div className="flex gap-4 items-center border border-gray-300 rounded-lg py-2 px-[100px] justify-center">
                  <p className="font-medium">Masuk </p>
                </div>
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              <small>
                Belum punya akun?{" "}
                <Link href="/registrasi" className=" underline">
                  Daftar
                </Link>
              </small>
            </div>
          </div>
          <div>
            <Image src={masuk} width={600} height={600} alt="masuk" />
          </div>
        </div>
      </div>
    </>
  );
}
