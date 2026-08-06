const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-orange-100",
  iconColor = "text-orange-500",
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon size={24} className={iconColor} />
      </div>

      <h2 className="text-4xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-lg font-semibold text-slate-700">
        {title}
      </p>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;