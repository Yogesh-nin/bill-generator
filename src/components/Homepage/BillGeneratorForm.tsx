import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { addBill } from "@/redux/slice/customerList";
import SuccessDialog from "./SuccessDialog";

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  mobile: z
    .string()
    .regex(/^\d+$/, { message: "Mobile number must contain only digits." })
    .min(10, { message: "Mobile number must be at least 10 digits." }),
  address: z.string().min(4, {
    message: "Address must be at least 4 characters.",
  }),
  billingDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Enter a valid timestamp string.",
  }),
  products: z.array(
    z.object({
      productName: z.string().min(1, {
        message: "Product name is required.",
      }),
      productQuantity: z.coerce
        .number()
        .min(1, { message: "Quantity must be at least 1." }),
      productPrice: z.coerce
        .number()
        .min(0, { message: "Price must be a positive number." }),
      totalPrice: z.coerce
        .number()
        .min(0, { message: "Total price must be a positive number." }),
    })
  ),
});

export type CustomerFormData = z.infer<typeof formSchema>;

const BillGeneratorForm = () => {
  const [date] = React.useState<Date>();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<CustomerFormData | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      mobile: "",
      address: "",
      billingDate: "",
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  console.log(fields);

  const onSubmit = (data: CustomerFormData) => {
    dispatch(addBill(data));
    setOpenDialog(true);
    setCurrentInvoice(data);
    form.reset();
  };
  return (
    <div className="w-full">
      {currentInvoice && (
        <SuccessDialog
          open={openDialog}
          setOpen={setOpenDialog}
          data={currentInvoice}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date ? date.toISOString() : "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {fields.length !== 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="mt-4 font-semibold">Add Product Details</h2>

              {fields.map((item, index: number) => (
                <div className="flex gap-2 items-center" key={item.id}>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 grow">
                    <FormField
                      control={form.control}
                      name={`products.${index}.productName`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Product name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.productQuantity`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Product Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter Product Quantity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.productPrice`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Product Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Product price"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.totalPrice`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Total Price</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Total Price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      </div>
                      <Trash onClick={()=> remove(index)} size={20} />
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between w-full mt-4">
            <Button
              type="button"
              onClick={() => {
                console.log("clicked"),
                  append({
                    productName: "",
                    productQuantity: 1,
                    productPrice: 0,
                    totalPrice: 0,
                  });
              }}
              className=""
              variant={"outline"}
            >
              Add Product +{" "}
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BillGeneratorForm;
