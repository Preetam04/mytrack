"use client";
import DarkModeBtn from "@/components/dark-mode-btn";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Disc3 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type authFormType = z.infer<typeof authFormSchema>;

export default function AuthPage() {
  const form = useForm<authFormType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: authFormType) {
    console.log(values);
    signIn("credentials", values);
  }

  return (
    <div className="w-full h-screen flex relative">
      <div className="absolute right-4 top-4">
        <DarkModeBtn />
      </div>

      <div className="bg-primary w-3/5 h-screen hidden sm:block bg-pattern " />
      <div className="flex flex-col items-start justify-center px-10 py-10 space-y-4">
        <div className="w-96 h-fit bg-card rounded-md      py-5 px-8 mx-3 self-center relative bottom-16">
          <Link href={"/"}>
            <div className="flex items-center space-x-3">
              <Disc3 className="text-primary" size={32} />
              <h1 className="text-2xl font-bold">MyTrack</h1>
            </div>
          </Link>
          <p className="mt-1 mb-5">
            Get started with MyTrack by signing in with your account.
          </p>
          <div className=" my-4">
            <Form {...form}>
              <form
                action="submit"
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                        />
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
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full">Sign In</Button>
              </form>
            </Form>
          </div>
          <Separator className="text-primary my-4" />

          <div className="w-full ">
            <Button
              className="w-full"
              onClick={() => {
                signIn("google");
              }}
            >
              {/* <Image
              src={googleIcon}
              fill={false}
              width={16}
              height={16}
              className=" font-medium"
              alt="google-ico"
            /> */}
              Sign In with Google{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
