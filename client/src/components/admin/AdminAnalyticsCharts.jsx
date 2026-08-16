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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute left-0 top-0 h-full w-1 ${accent}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={21} className={iconColor} />
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </div>
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

      {/* STAT CARDS */}

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
          subtitle="Complaints resolved"
          icon={CircleCheckBig}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          accent="bg-green-500"
        />

        <StatCard
          title="Avg. Resolution"
          value={`${avgResolutionTime}h`}
          subtitle="Average resolution time"
          icon={Clock3}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          accent="bg-blue-500"
        />

        <StatCard
          title="Rejection Rate"
          value={`${rejectionRate}%`}
          subtitle="Complaints rejected"
          icon={XCircle}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          accent="bg-red-500"
        />

      </div>


      {/* COMPLAINT TREND + STATUS */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ChartCard
          title="Complaint Trend"
          description="Number of complaints submitted each month."
        >
          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={complaintTrend}>

                <defs>
                  <linearGradient
                    id="complaintGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#f97316"
                      stopOpacity={0.3}
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
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Area
                  type="monotone"
                  dataKey="complaints"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#complaintGradient)"
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>


        <ChartCard
          title="Complaint Status"
          description="Current status of all complaints."
        >
          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {statusDistribution.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
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
                  iconType="circle"
                />

              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>


      {/* CATEGORY + PRIORITY */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ChartCard
          title="Complaints by Category"
          description="Number of complaints in each category."
        >
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={categoryDistribution}
                layout="vertical"
                margin={{
                  left: 20,
                  right: 20,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="value"
                  fill="#f97316"
                  radius={[0, 7, 7, 0]}
                  barSize={22}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>


        <ChartCard
          title="Complaints by Priority"
          description="Number of complaints by priority level."
        >
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={priorityDistribution}
                margin={{
                  left: -20,
                  right: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="value"
                  radius={[7, 7, 0, 0]}
                  barSize={40}
                >
                  {priorityDistribution.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
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