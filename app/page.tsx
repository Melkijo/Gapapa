import Navbar from "@/components/Navbar";
import Image from "next/image";
import hero from "@/assets/hero.png";
import heroProof1 from "@/assets/hero-proof-1.png";
import heroProof2 from "@/assets/hero-proof-2.png";
import heroProof3 from "@/assets/hero-proof-3.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="flex items-center py-10">
          <div className="w-[750px]">
            <h1 className=" font-extrabold text-hero leading-snug text-main-black">
              Jangan dipendem mulu{" "}
              <span className="text-main-yellow">Mending cerita</span>
            </h1>
            <p className="text-gray-500 text-lg font-medium mt-4 mb-6 w-[600px]">
              Ceritakan keseharianmu dan dapatkan saran dari AI yang sudah
              dipersonalisasi untukmu!
            </p>
            <Button
              asChild
              variant={"yellow"}
              className="font-medium text-lg"
              size={"hero"}
            >
              <Link href="/masuk">Mulai gratis</Link>
            </Button>
            <div className="flex gap-5 mt-6 items-center">
              <div className="flex -space-x-2">
                <Image src={heroProof1} width={45} height={45} alt="hero" />
                <Image src={heroProof2} width={45} height={45} alt="hero" />
                <Image src={heroProof3} width={45} height={45} alt="hero" />
              </div>
              <p className="text-gray-500 text-base font-medium ">
                Bergabung bersama 100+ pengguna lainnya
              </p>
            </div>
          </div>

          <div>
            <Image src={hero} width={500} height={500} alt="hero" />
          </div>
        </div>
      </main>
      <div className="w-full bg-[#3B3839]  py-4  absolute bottom-0">
        <p className="text-sm text-white text-center">
          © 2024 GAPAPA. All Rights Reserved.
        </p>
      </div>
    </>
  );
}
