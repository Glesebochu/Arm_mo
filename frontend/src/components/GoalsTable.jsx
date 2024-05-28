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

    let caption;
    let content;
    if (goals == null || goals == []) {
        caption =
            <TableCaption>
                Nothing to show here.
            </TableCaption>
    } else {
        content =
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

    }

    return (
        <>
            <div className="rounded-md border mt-4">
                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold"><Checkbox /></TableHead>
                            <TableHead className="font-bold">Activity</TableHead>
                            <TableHead className="font-bold">Meditation Object</TableHead>
                            <TableHead className="font-bold">Due</TableHead>
                        </TableRow>
                    </TableHeader>

                    {content}

                    {caption}

                </Table>
            </div>
        </>

    )
}

// ====================================================================
// ====================================================================
// ====================================================================

