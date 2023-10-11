import { UserTable } from "@/components/user-table";
import { UserCreate } from "@/components/user-create";
import { TypographyH1 } from "@/components/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DashboardPage() {
  return (
    <>
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
    </>
  );
}
