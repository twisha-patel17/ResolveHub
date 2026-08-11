import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Complaint from "../models/Complaint.model.js";

export const getUserDashboard = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const [
        total,
        pending,
        inProgress,
        resolved,
        recentComplaints,
    ] = await Promise.all([
        Complaint.countDocuments({
            createdBy: userId,
        }),
        Complaint.countDocuments({
            createdBy: userId,
            status: "Pending",
        }),
        Complaint.countDocuments({
            createdBy: userId,
            status: "In Progress",
        }),
        Complaint.countDocuments({
            createdBy: userId,
            status: "Resolved",
        }),
        Complaint.find({
            createdBy: userId,
        })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select(
                "complaintId title priority status updatedAt"
            ),
    ]);
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                stats: {
                    total,
                    pending,
                    inProgress,
                    resolved,
                },

                recentComplaints,
            },
            "Dashboard data fetched successfully"
        )
    );
});