"use client";

import * as z from "zod";
import React, { useState } from "react";
import { UserPlus2, UserX2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { createUser } from "@/actions/create-user";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface CreateProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  setError: (params: { title: string; description: string; icon?: React.ReactNode }) => void;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export function Create({ className, onSuccess, setError, ...props }: CreateProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      setError({
        title: "passwords do not match.",
        description: "please make sure your passwords match.",
        icon: <UserX2 className="h-4 w-4" />,
      });

      setLoading(false);
      return;
    }

    try {
      const user = await createUser(values);

      if (!user) {
        setError({
          title: "could not create user.",
          description: "please try again later.",
          icon: <UserX2 className="h-4 w-4" />,
        });
        return;
      }

      onSuccess?.();

      form.reset();
    } catch (error) {
      setError({
        title: "could not create user.",
        description: `${(error as Error).message.toLowerCase()}.`,
        icon: <UserX2 className="h-4 w-4" />,
      });
    }

    setLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel className="text-foreground">name.</FormLabel>
                <FormControl>
                  <Input placeholder="danielj247" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel className="text-foreground">email.</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel className="text-foreground">password.</FormLabel>
                <FormControl>
                  <Input placeholder="●●●●●●●●" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel className="text-foreground">confirm password.</FormLabel>
                <FormControl>
                  <Input placeholder="●●●●●●●●" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12 pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" /> creating...
                </>
              ) : (
                <>
                  <UserPlus2 className="mr-2 h-5 w-5" /> create.
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
