const SkeletonTable = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 h-5 w-1/3 rounded bg-slate-200" />

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="mb-4 h-12 rounded-lg bg-slate-100"
        />
      ))}
    </div>
  );
};

export default SkeletonTable;