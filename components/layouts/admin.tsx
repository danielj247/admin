import { ModeToggle } from "@/components/mode-toggle";
import { NavigationBar } from "@/components/navigation-bar";
import { SignOutButton } from "@/components/sign-out-button";
import { UserMenu } from "@/components/user-menu";
import { guard } from "@/lib/auth";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  await guard();

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
      <main className="w-full flex flex-col justify-center max-w-[1200px] mx-auto px-6">{children}</main>
    </>
  );
}

export default AdminLayout;
