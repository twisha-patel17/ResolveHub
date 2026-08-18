import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import SkeletonCard from "../../components/ui/SkeletonCard";

const ComplaintMonthlyChart = ({
  data = [],
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="w-full min-w-0">
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900">
            Monthly Complaints
          </h2>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            Complaint activity over the last 7 months.
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-xl bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600">
          7 Months
        </span>
      </div>

      {/* Chart */}
      <div className="h-60 w-full sm:h-64 lg:h-72">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No complaint data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                width={30}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "#fff7ed",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 8px 20px rgba(15,23,42,0.08)",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="complaints"
                name="Complaints"
                fill="#f97316"
                radius={[7, 7, 0, 0]}
                maxBarSize={34}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ComplaintMonthlyChart;