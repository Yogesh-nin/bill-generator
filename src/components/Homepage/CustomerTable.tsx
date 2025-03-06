
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { formatDate } from "./BillPdf";
import DownloadDialog from "./DownloadDialog";
import { RootState } from "@/redux/store";
import { CustomerFormData } from "./BillGeneratorForm";

interface ProductT {
  productName: string;
  productQuantity: number,
  productPrice: number,
  totalPrice: number
}

const CustomerTable = () => {
  const data = useSelector((state: RootState) => state.customerList.customerList) as CustomerFormData[];

  const fetchAmount = (products: ProductT[]) => {
    const totalAmount = products.reduce((sum, product) => sum + product.totalPrice, 0);
    return totalAmount;
  }

  return (
    <Table className="w-full max-w-full overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="px-2 text-[14px] lg:text-[16px]">Customer Name</TableHead>
          <TableHead className="px-2 text-[14px] lg:text-[16px]">Mobile No.</TableHead>
          <TableHead className="px-2 text-[14px] lg:text-[16px]">Address</TableHead>
          <TableHead className="px-2 text-[14px] lg:text-[16px]">Billing Date</TableHead>
          <TableHead className="px-2 text-[14px] lg:text-[16px]">Product Quantity</TableHead>
          <TableHead className="px-2 text-[14px] lg:text-[16px]">Billing Price</TableHead>
          <TableHead className="px-2 text-[14px] lg:text-[16px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.map((customer) => (
          <TableRow className="">
              <TableCell className="py-4 text-[14px]">{ customer.clientName}</TableCell>
              <TableCell className="py-4 text-[14px]">{ customer.mobile}</TableCell>
              <TableCell className="py-4 text-[14px] max-w-[100px] lg:max-w-[300px] overflow-hidden overflow-ellipsis">{ customer.address}</TableCell>
              <TableCell className="py-4 text-[14px]">{ formatDate(customer.billingDate)}</TableCell>
              <TableCell className="py-4 text-[14px]">{ customer.products.length}</TableCell>
              <TableCell className="py-4 text-[14px]">{ fetchAmount(customer.products)}</TableCell>
              <TableCell className="py-4 text-[14px] flex gap-2">
                <DownloadDialog onlyIcon={true} data={customer} />
              </TableCell>

          </TableRow>

          ))
        }
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
