import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  FileText,
  CircleCheckBig,
  Clock3,
  XCircle,
} from "lucide-react";

const COLORS = [
  "#f97316",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

const DEFAULT_DATA = {
  totalComplaints: 0,
  resolutionRate: 0,
  avgResolutionTime: 0,
  rejectionRate: 0,
  complaintTrend: [],
  statusDistribution: [],
  categoryDistribution: [],
  priorityDistribution: [],
};

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  accent,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div
        className={`absolute left-0 top-0 h-full w-1 ${accent}`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon
            size={21}
            className={iconColor}
          />
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({
  title,
  description,
  badge,
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

        {badge && (
          <span className="hidden rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 sm:block">
            {badge}
          </span>
        )}
      </div>

      {children}
    </div>
  );
};

const CustomPieLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}) => {
  if (percent < 0.05) {
    return null;
  }

  const RADIAN = Math.PI / 180;

  const radius = outerRadius + 20;

  const x =
    cx + radius * Math.cos(-midAngle * RADIAN);

  const y =
    cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#64748b"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdminAnalyticsCharts = ({
  analytics = {},
}) => {
  const data = {
    ...DEFAULT_DATA,
    ...analytics,
  };

  const {
    totalComplaints,
    resolutionRate,
    avgResolutionTime,
    rejectionRate,
    complaintTrend,
    statusDistribution,
    categoryDistribution,
    priorityDistribution,
  } = data;

  return (
    <div className="space-y-6">

      {/* =================================
          ANALYTICS STAT CARDS
      ================================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Complaints"
          value={totalComplaints}
          subtitle="All submitted complaints"
          icon={FileText}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
          accent="bg-orange-500"
        />

        <StatCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          subtitle="Complaints successfully resolved"
          icon={CircleCheckBig}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          accent="bg-green-500"
        />

        <StatCard
          title="Avg. Resolution Time"
          value={`${avgResolutionTime}d`}
          subtitle="Average time to resolve"
          icon={Clock3}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          accent="bg-blue-500"
        />

        <StatCard
          title="Rejection Rate"
          value={`${rejectionRate}%`}
          subtitle="Complaints that were rejected"
          icon={XCircle}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          accent="bg-red-500"
        />

      </div>

      {/* =================================
          ROW 1
      ================================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Complaint Trend */}
        <ChartCard
          title="Complaint Trend"
          description="Complaint submissions over time."
          badge="Monthly"
        >
          <div className="h-72 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={complaintTrend}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >

                <defs>
                  <linearGradient
                    id="complaintTrendGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#f97316"
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="100%"
                      stopColor="#f97316"
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
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{
                    stroke: "#f97316",
                    strokeDasharray: "4 4",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="complaints"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#complaintTrendGradient)"
                  dot={{
                    r: 4,
                    fill: "#f97316",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </ChartCard>

        {/* Status Distribution */}
        <ChartCard
          title="Complaint Status"
          description="Distribution of complaints by current status."
          badge="Status"
        >
          <div className="h-72 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  labelLine={false}
                  label={CustomPieLabel}
                >
                  {statusDistribution.map(
                    (entry, index) => (
                      <Cell
                        key={`status-${index}`}
                        fill={
                          entry.color ||
                          COLORS[index % COLORS.length]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                />

              </PieChart>
            </ResponsiveContainer>

          </div>
        </ChartCard>

      </div>

      {/* =================================
          ROW 2
      ================================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Category */}
        <ChartCard
          title="Complaints by Category"
          description="Identify the most common complaint categories."
          badge="Category"
        >
          <div className="h-80 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={categoryDistribution}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 15,
                  left: 20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  width={95}
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{
                    fill: "#fff7ed",
                  }}
                />

                <Bar
                  dataKey="count"
                  fill="#f97316"
                  radius={[
                    0,
                    7,
                    7,
                    0,
                  ]}
                  barSize={22}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </ChartCard>

        {/* Priority */}
        <ChartCard
          title="Complaints by Priority"
          description="Understand the severity of submitted complaints."
          badge="Priority"
        >
          <div className="h-80 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={priorityDistribution}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="priority"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748b",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{
                    fill: "#f8fafc",
                  }}
                />

                <Bar
                  dataKey="count"
                  radius={[
                    7,
                    7,
                    0,
                    0,
                  ]}
                  barSize={38}
                >
                  {priorityDistribution.map(
                    (entry, index) => (
                      <Cell
                        key={`priority-${index}`}
                        fill={
                          entry.color ||
                          COLORS[index % COLORS.length]
                        }
                      />
                    )
                  )}
                </Bar>

              </BarChart>
            </ResponsiveContainer>

          </div>
        </ChartCard>

      </div>

    </div>
  );
};

export default AdminAnalyticsCharts;