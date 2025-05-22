import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/app/types/student";
import TanTable from "@/components/tan-table";
import { findAllStudents } from "@/lib/api/student";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "studentNumber",
    header: "Student Number",
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const student = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() =>
  //               navigator.clipboard.writeText(student.id.toString())
  //             }
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export default async function StudentsPage() {
  const students = await findAllStudents();

  return (
    <div>
      <h1>Students</h1>
      <TanTable
        columns={columns}
        data={students}
      />

    </div>
  );
}
