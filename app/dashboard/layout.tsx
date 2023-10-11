import { guard } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await guard();

  return <>{children}</>;
}
