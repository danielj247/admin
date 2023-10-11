import AdminLayout from "@/components/layouts/admin";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
