import { Award } from "lucide-react";
import PageHeader from "../../components/PageHeader";

function Achievements() {
  return (
    <>
      <PageHeader title="Achievements" />
      <div className="flex flex-row gap-4 items-center flex-wrap px-6">
        <div className="flex flex-col items-center justify-center shadow rounded-lg p-6 bg-white">
          <div className="bg-green-100 p-6 rounded-md">
            <Award className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-lg font-bold mt-4">Course Completion</h1>
          <h1 className="text-lg font-bold mt-4">1</h1>
        </div>
      </div>
    </>
  );
}

export default Achievements;
