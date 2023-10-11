import AdminLayout from "@/components/layouts/admin";

export default async function UserIDLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
