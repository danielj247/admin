"use client";

import * as z from "zod";
import { useState } from "react";
import { UserCheck2, UserPlus2, UserX2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/actions/create-user";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export function UserCreate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userDetails, setUserDetails] = useState<Pick<User, "name" | "email">>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const user = await createUser(values);

      if (!user) {
        setError("Error creating user");
        return;
      }

      setUserDetails({
        name: user.name,
        email: user.email,
      });

      form.reset();
    } catch (error) {
      setError((error as Error).message);
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      {userDetails && (
        <Alert className="my-5">
          <UserCheck2 className="h-4 w-4" />
          <AlertTitle>user created.</AlertTitle>
          <AlertDescription>
            a user has just been created, {userDetails?.name} {userDetails?.email}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="my-5">
          <UserX2 className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription>The user could not be created</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 gap-4 md:grid grid-cols-12">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel className="text-foreground">name.</FormLabel>
              <FormControl>
                <Input placeholder="danielj247" {...field} />
              </FormControl>
              <FormDescription>Public display name.</FormDescription>
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
              <FormDescription>The email address which will be used to login.</FormDescription>
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
                <Input placeholder="●●●●●●●●" {...field} />
              </FormControl>
              <FormDescription>Temporary password for the user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-12 pt-4">
          <Button type="submit" disabled={loading}>
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
  );
}
