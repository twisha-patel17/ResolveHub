import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <LoaderCircle
        size={40}
        className="animate-spin text-orange-500"
      />
    </div>
  );
};

export default LoadingSpinner;