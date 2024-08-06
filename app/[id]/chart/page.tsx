import PieChartComponent from "@/components/PieChart";
import { Progress } from "@/components/ui/progress";
import UserSidebar from "@/components/UserSidebar";
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
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";

const invoices = [
  {
    tanggal: "2022-02-14",
    perasaan: "bahagia",
    cerita:
      "Hari ini saya merayakan hari Valentine bersama keluarga dan teman-teman.",
  },
  {
    tanggal: "2023-01-01",
    perasaan: "bersemangat",
    cerita:
      "Memulai tahun baru dengan resolusi dan semangat baru untuk mencapai tujuan.",
  },
  {
    tanggal: "2021-12-25",
    perasaan: "gembira",
    cerita:
      "Merayakan Natal dengan suasana hangat dan penuh kebahagiaan bersama keluarga.",
  },
  {
    tanggal: "2022-07-20",
    perasaan: "lega",
    cerita:
      "Akhirnya menyelesaikan proyek besar yang telah dikerjakan selama berbulan-bulan.",
  },
  {
    tanggal: "2023-04-17",
    perasaan: "puas",
    cerita: "Mendapatkan hasil yang memuaskan dalam ujian akhir semester.",
  },
  {
    tanggal: "2022-11-10",
    perasaan: "terharu",
    cerita:
      "Menghadiri acara pernikahan sahabat terbaik dan merasakan momen emosional.",
  },
];
export default async function Page() {
  await loginIsRequiredServer();

  const session = await getServerSession(authConfig);
  return (
    <UserSidebar>
      <div className="mb-6">
        <h2 className="font-bold text-2xl">Analisis</h2>
        <p>Cek progres perasaanmu yuks</p>
      </div>
      <div className="flex gap-20">
        <div className="w-[300px] rounded-md border border-gray-100 p-6">
          <h3 className="font-semibold -mb-5 text-lg">Perasaan hari ini</h3>
          <PieChartComponent />
        </div>
        <div className="space-y-8">
          <div className="border border-gray-100 p-6 rounded-md">
            <h3 className="font-semibold mb-2 text-lg">
              Paling dominan hari ini
            </h3>
            <div className="w-[100px] h-[100px] rounded-full bg-red-400 flex justify-center items-center text-white">
              Senang
            </div>
          </div>
          <div className="border border-gray-100 p-6 rounded-md">
            <h3 className="font-semibold mb-2 text-lg">Perasaan </h3>
            <div className="space-y-4">
              <div>
                <p>Senang</p>
                <Progress value={63} />
              </div>
              <div>
                <p>Netral</p>
                <Progress value={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4">
        <hr />
      </div>
      <Table className="mb-8">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Tanggal</TableHead>
            <TableHead>Perasaan</TableHead>
            <TableHead>Cerita</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.tanggal}>
              <TableCell className="font-medium">{invoice.tanggal}</TableCell>
              <TableCell>{invoice.perasaan}</TableCell>
              <TableCell>{invoice.cerita}</TableCell>
              {/* <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </UserSidebar>
  );
}
