import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import ComplaintDetail from "../../components/complaint/ComplaintDetails";

const ComplaintDetailPage = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <ComplaintDetail complaintId={id} />
    </DashboardLayout>
  );
};

export default ComplaintDetailPage;