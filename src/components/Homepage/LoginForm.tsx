"use client"
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters"
    })
    
})

export type FormData = z.infer<typeof FormSchema>

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        email: "",
        password: ""
    },
  })

  const {
    handleSubmit,
    formState: { isValid }
  } = form

  const onSubmit = (data: FormData ) => {
    const userData = { email: data.email, password: data.password }
    dispatch(login(userData));

    navigate("/home");

  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!isValid} type="submit">Submit</Button>
      </form>
    </Form>
  )
}
