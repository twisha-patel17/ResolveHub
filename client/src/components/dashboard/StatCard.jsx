import { ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  accentColor,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      
      <div
        className={`absolute left-0 top-0 h-full w-1 ${accentColor}`}
      />

      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={21} className={iconColor} />
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition group-hover:bg-slate-100">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        <p className="mt-2 text-xs font-medium text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StatCard;