"use client";

import React, { useState } from "react";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { LogIn, UserX2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {
  setError: (params: { title: string; description: string; icon?: React.ReactNode }) => void;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export function Login({ className, setError, ...props }: LoginProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const login = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (login?.error) {
        setLoading(false);

        setError({
          title: "could not sign in.",
          description: `${login.error.toLowerCase()}.`,
          icon: <UserX2 className="h-4 w-4" />,
        });

        return;
      }

      window.location.replace(window.location.origin + "/dashboard");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">email.</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
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
                <FormLabel className="text-foreground">password.</FormLabel>
                <FormControl>
                  <Input placeholder="●●●●●●●●●●●●" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" /> signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" /> sign in.
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
