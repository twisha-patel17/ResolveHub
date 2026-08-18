import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ResolutionTrendChart = ({ data = [] }) => {
  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 xs:flex-row xs:items-start xs:justify-between sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Resolution Trend
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Track resolved complaints over time.
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-xl bg-green-50 px-3 py-2 text-[11px] font-semibold text-green-600 sm:text-xs">
          Resolved
        </span>
      </div>

      {/* Chart */}
      <div className="h-56 w-full min-w-0 sm:h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="resolutionGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
              interval="preserveStartEnd"
              padding={{
                left: 5,
                right: 5,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={32}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 8px 20px rgba(15,23,42,0.08)",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#22c55e"
              strokeWidth={2.5}
              fill="url(#resolutionGradient)"
              dot={{
                r: 3,
                fill: "#22c55e",
                strokeWidth: 2,
                stroke: "#ffffff",
              }}
              activeDot={{
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResolutionTrendChart;