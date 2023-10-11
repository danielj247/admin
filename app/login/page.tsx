"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { UserPlus2, LogIn, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { SeperatorText } from "@/components/seperator-text";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH1 } from "@/components/typography";
import { Login } from "@/components/auth/login";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Create = dynamic(() => import("@/components/auth/create").then((mod) => mod.Create), {
  loading: () => (
    <div className="space-y-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        name.
      </label>
      <Skeleton className="h-10 w-full mb-1" />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        email.
      </label>
      <Skeleton className="h-10 w-full mb-1" />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        password.
      </label>
      <Skeleton className="h-10 w-full mb-1" />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        confirm password.
      </label>
      <Skeleton className="h-10 w-full mb-1" />
      <Skeleton className="h-10 w-full mb-1" />
    </div>
  ),
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "create">("login");
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>();

  return (
    <>
      <nav className="absolute flex justify-end gap-2 p-2 w-full">
        <ModeToggle />
      </nav>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-96">
          {alert && (
            <Alert className="my-5">
              {alert.icon || <Info />}
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          )}

          <Card className="w-full">
            <CardHeader>
              <TypographyH1>admin.</TypographyH1>
              <CardDescription className="text-xl font-semibold tracking-tight">
                {mode === "create" ? "create an account." : "sign in."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mode === "login" && (
                <>
                  <Login setError={setAlert} />
                  <SeperatorText>or</SeperatorText>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full mt-3"
                    onClick={() => {
                      setMode("create");
                      setAlert(undefined);
                    }}
                  >
                    <UserPlus2 className="mr-2 h-5 w-5" /> create an account.
                  </Button>
                </>
              )}
              {mode === "create" && (
                <>
                  <Create
                    setError={setAlert}
                    onSuccess={() => {
                      setMode("login");
                      setAlert({
                        title: "account created.",
                        description: "you can log in now.",
                      });
                    }}
                  />
                  <SeperatorText>or</SeperatorText>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full mt-3"
                    onClick={() => {
                      setMode("login");
                      setAlert(undefined);
                    }}
                  >
                    <LogIn className="mr-2 h-5 w-5" /> sign in.
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
