import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useRef } from "react";
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
import { Button } from "../ui/button";
import { CustomerFormData } from "./BillGeneratorForm";

export const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-GB");
};

const BillPdf: React.FC<{data: CustomerFormData}> = ({ data }) => {
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPDF = () => {
      const input = formRef.current;
      
      if (!input) return;

    html2canvas(input, { backgroundColor: "rgb(255, 255, 255)", scale: 2 }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        console.log(imgData);
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${data.clientName}.pdf`);
      }
    );
    };
    
    
    const totalAmount = data.products.reduce((sum, product) => sum + product.totalPrice, 0);

  return (
    <div  style={{ backgroundColor: "rgb(255, 255, 255)", boxShadow: "none" }}>
          <div
              ref={formRef}
        className="w-full"
        style={{ backgroundColor: "white", padding: "20px" }}
      >
        <div className="flex w-full justify-between">
          <div className="w-[45%]">
            <h3>Bill to</h3>
            <p className="font-semibold">{data.clientName}</p>
            <p className="font-semibold"> {data.mobile}</p>
            <address>{data.address}</address>
          </div>
          <div>
            <ul>
              <li> <span className="font-semibold">Invoice Id:</span> 000000</li>
              <li> <span className="font-semibold">Billing date:</span> {formatDate(data.billingDate)}</li>
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden lg:table-cell">Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Total Price (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map((prod) => (
                <TableRow>
                  <TableCell className="font-medium">
                    {prod.productName}
                  </TableCell>
                  <TableCell>{prod.productQuantity}</TableCell>
                  <TableCell>{prod.productPrice}</TableCell>
                  <TableCell>{prod.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                              <TableCell className="text-right">₹{ totalAmount }</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
          <Button className="float-right" onClick={() => handleDownloadPDF()}>Download</Button>
    </div>
  );
};

export default BillPdf;
