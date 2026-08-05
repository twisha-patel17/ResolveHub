import { Link } from "react-router-dom";

const EmptyState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonLink,
  iconBg = "bg-orange-100",
  iconColor = "text-orange-500",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
      <div
        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon className={`${iconColor}`} size={30} />
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {buttonText && (
        <Link
          to={buttonLink}
          className="mt-8 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;