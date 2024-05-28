import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "./ui/checkbox"

export function GoalsTable({ goals }) {

    return (
        <>
            <Table className="mt-4">

                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Select</TableHead>
                        <TableHead className="font-bold">Activity</TableHead>
                        <TableHead className="font-bold">Meditation Object</TableHead>
                        <TableHead className="font-bold">Due</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        goals.map(g => (
                            <TableRow key={g.Id}>
                                <TableCell>
                                    <Checkbox id={g.Id} />
                                </TableCell>
                                <TableCell>{g.Activity}</TableCell>
                                <TableCell>{g.MeditationObject}</TableCell>
                                <TableCell>{g.DueDateTime}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>
        </>

    )
}

// ====================================================================
// ====================================================================
// ====================================================================

