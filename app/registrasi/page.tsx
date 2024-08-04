import { FacebookIcon, GoogleIcon } from "@/components/icon";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import daftar from "@/assets/daftar.png";
export default function Page() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex gap-20 items-center">
          <div className="w-[500px]">
            <h2 className="text-2xl font-bold text-center mb-4">Daftar</h2>
            <div className="flex flex-col  gap-2">
              <div className="flex gap-4 items-center border border-gray-300 rounded-lg py-2 px-[100px] justify-center">
                <GoogleIcon />
                <p className="font-medium">Daftar dengan Google</p>
              </div>
              <div className="flex gap-4 items-center border border-gray-300 rounded-lg py-2 px-[100px] justify-center">
                <FacebookIcon />
                <p className="font-medium">Daftar dengan Facebook</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <small>
                Sudah punya akun?{" "}
                <Link href="/masuk" className=" underline">
                  Masuk
                </Link>
              </small>
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
