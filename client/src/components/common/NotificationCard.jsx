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
    },

    comment: {
      icon: "bg-orange-100 text-orange-500",
    },

    success: {
      icon: "bg-green-100 text-green-600",
    },

    default: {
      icon: "bg-slate-100 text-slate-500",
    },
  };

  const currentStyle = styles[type] || styles.default;

  return (
    <div
      className={`
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        border-l-2
        bg-white
        p-4
        shadow-sm
        transition
        hover:shadow-md
        sm:p-5
        ${unread ? "border-l-orange-500" : "border-l-transparent"}
      `}
    >
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            sm:h-11
            sm:w-11
            ${currentStyle.icon}
          `}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 pr-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <h3 className="min-w-0 break-words text-sm font-semibold leading-5 text-slate-900 sm:text-base">
              {title}
            </h3>

            {/* Unread indicator */}
            {unread && (
              <span
                className="
                  mt-1
                  h-2.5
                  w-2.5
                  shrink-0
                  rounded-full
                  bg-green-400
                  ring-4
                  ring-green-100
                "
              />
            )}
          </div>

          <p className="mt-1.5 break-words text-sm leading-6 text-slate-600">
            {message}
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;