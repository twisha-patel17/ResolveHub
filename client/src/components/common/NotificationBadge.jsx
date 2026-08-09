const NotificationBadge = ({ count }) => {
  if (!count || count <= 0) {
    return null;
  }

  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[11px] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default NotificationBadge;