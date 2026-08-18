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

import SkeletonCard from "../../components/ui/SkeletonCard";
import SkeletonTable from "../../components/ui/SkeletonTable";

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
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  accent,
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className={`absolute left-0 top-0 h-full w-1 ${accent}`} />
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
          {title}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {value}
        </h3>
        <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
          {subtitle}
        </p>
      </div>

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${iconBg}`}
      >
        <Icon size={19} className={iconColor} />
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, description, children, loading }) => (
  <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
    <div className="mb-5 sm:mb-6">
      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
        {title}
      </h2>
      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
        {description}
      </p>
    </div>

    {loading ? <SkeletonTable /> : children}
  </div>
);

const AdminAnalyticsCharts = ({ analytics = {}, loading = false }) => {
  const data = { ...DEFAULT_DATA, ...analytics };

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

  const stats = [
    {
      title: "Total Complaints",
      value: totalComplaints,
      subtitle: "All submitted complaints",
      icon: FileText,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      accent: "bg-orange-500",
    },
    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      subtitle: "Complaints resolved",
      icon: CircleCheckBig,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      accent: "bg-green-500",
    },
    {
      title: "Avg. Resolution",
      value: `${avgResolutionTime}h`,
      subtitle: "Average resolution time",
      icon: Clock3,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      accent: "bg-blue-500",
    },
    {
      title: "Rejection Rate",
      value: `${rejectionRate}%`,
      subtitle: "Complaints rejected",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      accent: "bg-red-500",
    },
  ];

  const chartConfig = [
    {
      title: "Complaint Trend",
      description: "Number of complaints submitted each month.",
      data: complaintTrend,
      type: "area",
    },
    {
      title: "Complaint Status",
      description: "Current status of all complaints.",
      data: statusDistribution,
      type: "pie",
    },
    {
      title: "Complaints by Category",
      description: "Number of complaints in each category.",
      data: categoryDistribution,
      type: "category",
    },
    {
      title: "Complaints by Priority",
      description: "Number of complaints by priority level.",
      data: priorityDistribution,
      type: "priority",
    },
  ];

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {loading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        {chartConfig.map((chart) => (
          <ChartCard
            key={chart.title}
            title={chart.title}
            description={chart.description}
            loading={loading}
          >
            <div className="h-64 w-full min-w-0 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                {chart.type === "area" && (
                  <AreaChart data={chart.data}>
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
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="complaints"
                      stroke="#f97316"
                      strokeWidth={2.5}
                      fill="url(#complaintGradient)"
                    />
                  </AreaChart>
                )}

                {chart.type === "pie" && (
                  <PieChart>
                    <Pie
                      data={chart.data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="42%"
                      innerRadius="25%"
                      outerRadius="58%"
                      paddingAngle={3}
                    >
                      {chart.data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip contentStyle={tooltipStyle} />

                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: "12px",
                        paddingTop: "8px",
                      }}
                    />
                  </PieChart>
                )}

                {chart.type === "category" && (
                  <BarChart
                    data={chart.data}
                    layout="vertical"
                    margin={{ left: 0, right: 10 }}
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
                      width={75}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#64748b" }}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar
                      dataKey="value"
                      fill="#f97316"
                      radius={[0, 7, 7, 0]}
                      barSize={20}
                    />
                  </BarChart>
                )}

                {chart.type === "priority" && (
                  <BarChart data={chart.data}>
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
                    <Tooltip contentStyle={tooltipStyle} />

                    <Bar
                      dataKey="value"
                      radius={[7, 7, 0, 0]}
                      barSize={32}
                    >
                      {chart.data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </ChartCard>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalyticsCharts;