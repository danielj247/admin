import { UserMenu } from "@/components/user-menu";
import { UserTable } from "@/components/user-table";
import { UserCreate } from "@/components/user-create";
import { ModeToggle } from "@/components/mode-toggle";
import { TypographyH1 } from "@/components/typography";
import { NavigationBar } from "@/components/navigation-bar";
import { SignOutButton } from "@/components/sign-out-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DashboardPage() {
  return (
    <>
      <nav className="flex justify-between p-2 border-b">
        <UserMenu />
        <NavigationBar />
        <div className="flex justify-end gap-2">
          <ModeToggle />
          <SignOutButton />
        </div>
      </nav>
      <main className="w-full flex flex-col justify-center max-w-[1200px] mx-auto px-6">
        <TypographyH1 className="mt-5">Users</TypographyH1>
        <Tabs defaultValue="account" className="w-full mt-5">
          <TabsList>
            <TabsTrigger value="account">All users</TabsTrigger>
            <TabsTrigger value="password">Create user</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <UserTable />
          </TabsContent>
          <TabsContent value="password">
            <div className="max-w-96 max-w-5xl">
              <UserCreate />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
