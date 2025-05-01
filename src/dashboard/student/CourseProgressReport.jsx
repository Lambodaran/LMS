import PageHeader from "../../components/PageHeader";

function CourseProgressReport() {
  return (
    <>
      <PageHeader title={"Course Progress"} />
      <div className="px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center mb-4 gap-4">
          <h3 className="text-bases font-medium">Report</h3>
          <input
            type="text"
            placeholder="Search course"
            className="bg-white px-3 py-1 text-black shadow rounded-md"
          />
        </div>
        <ProgressReportTable />
      </div>
    </>
  );
}

export default CourseProgressReport;

const ProgressReportTable = () => {
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full rounded-md">
          <thead>
            <tr className="bg-green-600 text-white text-sm font-medium h-10 text-left divide-x divide-gray-200">
              <th className="px-2 ">COURSE</th>
              <th className="px-2 w-24">PROGRESS</th>
              <th className="px-2 w-24">SCORE</th>
              <th className="px-2 w-56">EXPIRY OF THE COURSE</th>
              <th className="px-2 w-24">PERCENTILE</th>
              <th className="px-2 w-32">TIME SPENT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-x divide-gray-200">
            <tr className="bg-white text-black font-base h-10 divide-x divide-gray-200">
              <td className="px-2" data-cell="course">
                Full Stack Web Development
              </td>
              <td className="px-2" data-cell="progress">
                80%
              </td>
              <td className="px-2" data-cell="score">
                85%
              </td>
              <td className="px-2" data-cell="expiry">
                2024-12-31
              </td>
              <td className="px-2" data-cell="percentile">
                90%
              </td>
              <td className="px-2" data-cell="timeSpend">
                10 hours
              </td>
            </tr>
            <tr className="bg-white text-black font-base h-10 divide-x divide-gray-200">
              <td className="px-2 ">Full Stack Web Development</td>
              <td className="px-2">80%</td>
              <td className="px-2">85%</td>
              <td className="px-2">2024-12-31</td>
              <td className="px-2">90%</td>
              <td className="px-2">10 hours</td>
            </tr>
            <tr className="bg-white text-black font-base h-10 divide-x divide-gray-200">
              <td className="px-2">Full Stack Web Development</td>
              <td className="px-2">80%</td>
              <td className="px-2">85%</td>
              <td className="px-2">2024-12-31</td>
              <td className="px-2">90%</td>
              <td className="px-2">10 hours</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className=" md:hidden flex flex-col gap-4">
        <div className="grid grid-cols-2 shadow rounded-md p-4 gap-2 text-sm w-full bg-white">
          {/* course Name */}
          <label htmlFor="" className="font-semibold">
            Course
          </label>
          <p>FullStack Web Development</p>
          {/* Progress Percentage */}
          <label htmlFor="" className="font-semibold">
            Progress
          </label>
          <p>80%</p>
          {/* Score Percentage */}
          <label htmlFor="" className="font-semibold">
            Score
          </label>
          <p>85%</p>
          {/* Date */}
          <label htmlFor="" className="font-semibold">
            Expiry of the course
          </label>
          <p>31-12-2025</p>
          {/* Date */}
          <label htmlFor="" className="font-semibold">
            Percentile
          </label>
          <p>90%</p>
          {/* time spent */}
          <label htmlFor="" className="font-semibold">
            Time Spent
          </label>
          <p>10 hours</p>
        </div>
      </div>
    </>
  );
};
