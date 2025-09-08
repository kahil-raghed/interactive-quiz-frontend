import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createColumnHelper } from "@tanstack/react-table";

type TData = {
    name: string;
    mark: number;
}

const demoData: TData[] = [
    {
        name: "John Doe",
        mark: 5,
    },
    {
        name: "Jane Doe 2",
        mark: 4,
    }
]

const h = createColumnHelper<TData>();

const columns = [
    h.accessor("name", {
        header: "Name"
    }),
    h.accessor("mark", {
        header: "Mark"
    })
];

export default function QuizAnswers() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Quiz answers
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable data={demoData} columns={columns} />
                </CardContent>
            </Card>
        </div>
    );
}