const NotificationCard = ({
  icon,
  title,
  message,
  time,
  type = "info",
  unread = false,
}) => {
  const styles = {
    info: {
      icon: "bg-blue-100 text-blue-600",
      border: unread
        ? "border-l-orange-500"
        : "border-l-transparent",
    },

    comment: {
      icon: "bg-orange-100 text-orange-500",
      border: unread
        ? "border-l-orange-500"
        : "border-l-transparent",
    },

    success: {
      icon: "bg-green-100 text-green-600",
      border: unread
        ? "border-l-orange-500"
        : "border-l-transparent",
    },

    default: {
      icon: "bg-slate-100 text-slate-500",
      border: "border-l-transparent",
    },
  };

  const currentStyle =
    styles[type] || styles.default;

  return (
    <div
      className={`
        relative
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-slate-200
        border-l-2
        ${currentStyle.border}
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      `}
    >
    
      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${currentStyle.icon}
        `}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {message}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {time}
        </p>

      </div>

      {unread && (
        <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-green-400 ring-4 ring-green-100" />
      )}
    </div>
  );
};

export default NotificationCard;