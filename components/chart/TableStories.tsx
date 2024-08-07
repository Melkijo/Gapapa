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

export default function TableStories({ data }: { data: any }) {
  return (
    <Table className="mb-8">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className=" w-[200px]">Tanggal</TableHead>
          <TableHead>Perasaan</TableHead>
          <TableHead className="md:w-auto w-[300px]">Cerita</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.storyDate}>
            <TableCell className="font-normal md:font-medium">
              {item.storyDate}
            </TableCell>
            <TableCell>{item.feel}</TableCell>
            <TableCell>{item.story}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
