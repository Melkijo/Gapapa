import Navbar from "@/components/Navbar";
import Image from "next/image";
import hero from "@/assets/hero.png";
import heroProof1 from "@/assets/hero-proof-1.png";
import heroProof2 from "@/assets/hero-proof-2.png";
import heroProof3 from "@/assets/hero-proof-3.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/1/dashboard");
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="flex md:flex-row flex-col-reverse items-center pb-10 pt-6">
          <div className="w-full md:w-[750px]">
            <h1 className=" font-extrabold text-4xl md:text-hero leading-snug text-main-black">
              Don't keep it to yourself{" "}
              <span className="text-main-yellow">Better tell a story</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg font-medium mt-4 mb-6 w-full md:w-[600px]">
              Tell us about your daily life and get personalized AI advice!
            </p>
            <Button
              asChild
              variant={"yellow"}
              className="font-medium text-lg w-full md:w-auto"
              size={"hero"}
            >
              <Link href="/registrasi">Try free</Link>
            </Button>
            <div className="flex gap-12 md:gap-5 mt-7 items-center md:items-center">
              <div className="flex -space-x-2">
                <Image src={heroProof1} width={45} height={45} alt="hero" />
                <Image src={heroProof2} width={45} height={45} alt="hero" />
                <Image src={heroProof3} width={45} height={45} alt="hero" />
              </div>
              <p className="text-gray-500 text-sm md:text-base font-medium ">
                Join 100+ other users
              </p>
            </div>
          </div>

          <div className="mb-6">
            <Image src={hero} width={500} height={500} alt="hero" />
          </div>
        </div>
      </main>
      <div className="w-full bg-[#3B3839]  py-4  block md:absolute bottom-0">
        <p className="text-xs md:text-sm text-white text-center">
          © 2024 GAPAPA. All Rights Reserved.
        </p>
      </div>
    </>
  );
}
