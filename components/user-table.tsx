import { User } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/lib/prisma";

export type UserTableData = Pick<User, "id" | "name" | "email">;

const USER_TABLE_COLUMNS = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
];

async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export async function UserTable() {
  const users = await getUsers();

  return <DataTable columns={USER_TABLE_COLUMNS} data={users} />;
}
