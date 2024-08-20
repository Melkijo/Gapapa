import { FacebookIcon } from "@/components/icon";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import daftar from "@/assets/daftar.png";
import { GoogleSignInButton } from "@/components/AuthButtons";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/1/dashboard");
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex gap-10 md:gap-20 items-center flex-col-reverse md:flex-row">
          <div className="w-full md:w-[500px]">
            <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>
            <div className="flex flex-col  gap-2">
              <GoogleSignInButton />

              {/* <div className="flex gap-4 items-center border border-gray-300 rounded-lg py-2  justify-center hover:bg-gray-200">
                <FacebookIcon />
                <p className="font-medium">Daftar dengan Facebook</p>
              </div> */}
            </div>
            <div className="flex justify-center mt-4 pb-10 ">
              <p>
                Have an account?{" "}
                <Link href="/masuk" className=" underline hover:font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
          <div>
            <Image src={daftar} width={600} height={600} alt="masuk" />
          </div>
        </div>
      </div>
    </>
  );
}
