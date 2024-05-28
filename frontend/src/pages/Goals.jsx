
import { GoalsTable } from '../components/GoalsTable.jsx';

export function Goals() {

    const goalsDummy = [
        {
            Id: 1,
            Status: "NotStarted",
            Activity: "Read",
            MeditationObject: "4 paragraphs of a book",
            DueDateTime: "2022-07-25 14:30:45"
        },
        {
            Id: 2,
            Status: "NotStarted",
            Activity: "Read",
            MeditationObject: "4 paragraphs of a book",
            DueDateTime: "2022-07-25 14:30:45"
        },
        {
            Id: 3,
            Status: "Underway",
            Activity: "Remove",
            MeditationObject: "corn silk",
            DueDateTime: "2022-07-25 14:30:45"
        },
        {
            Id: 4,
            Status: "Underway",
            Activity: "Remove",
            MeditationObject: "corn silk",
            DueDateTime: "2022-07-25 14:30:45"
        },
        {
            Id: 5,
            Status: "Done",
            Activity: "Wash",
            MeditationObject: "the chevrolet",
            DueDateTime: "2022-07-25 14:30:45"
        },
        {
            Id: 6,
            Status: "Done",
            Activity: "Wash",
            MeditationObject: "the chevrolet",
            DueDateTime: "2022-07-25 14:30:45"
        }
    ]

    const notStartedGoals = goalsDummy.filter(g => g.Status == "NotStarted");
    const underwayGoals = goalsDummy.filter(g => g.Status == "Underway");
    const doneGoals = goalsDummy.filter(g => g.Status == "Done");

    return (
        <>
            <h2>Goals</h2>
            <h3 className="">Not Started</h3>
            <GoalsTable goals={notStartedGoals} />
            <h3 className="">Underway</h3>
            <GoalsTable goals={underwayGoals} />
            <h3 className="">Done</h3>
            <GoalsTable goals={doneGoals} />
        </>
    );

}