import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import ComplaintDetails from "../../components/complaint/ComplaintDetails";

const ComplaintDetailPage = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <ComplaintDetails complaintId={id} />
    </DashboardLayout>
  );
};

export default ComplaintDetailPage;