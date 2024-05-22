import UsageView from "../Pages/Usage";
import { DataTableDemo } from "../components/Custom/SessionTable.jsx";
const SessionSummary = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {" "}
        h1
      </h1>
      <UsageView />
      <DataTableDemo />
    </div>
  );
};

export default SessionSummary;
