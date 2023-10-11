import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession();

  if (!session?.user) redirect("/login");

  redirect("/dashboard");
}
