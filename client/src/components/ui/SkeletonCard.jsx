const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 h-12 w-12 rounded-xl bg-slate-200" />

      <div className="mb-3 h-5 w-2/3 rounded bg-slate-200" />

      <div className="h-4 w-full rounded bg-slate-100" />
    </div>
  );
};

export default SkeletonCard;