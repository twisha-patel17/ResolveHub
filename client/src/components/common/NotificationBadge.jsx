import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";

const NotificationBadge = () => {
  const navigate = useNavigate();

  const { unreadCount } = useNotifications();

  return (
    <button
      type="button"
      onClick={() => navigate("/notifications")}
      className="
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        text-slate-600
        transition
        hover:border-orange-200
        hover:bg-orange-50
        hover:text-orange-500
      "
      aria-label="Notifications"
    >
      <Bell size={20} />

      {unreadCount > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            min-h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-orange-500
            px-1
            text-[11px]
            font-bold
            text-white
            ring-2
            ring-white
          "
        >
          {unreadCount > 99
            ? "99+"
            : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;