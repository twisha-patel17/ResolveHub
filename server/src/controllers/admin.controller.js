import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAdminDashboard = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        admin: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },
        message: "Welcome to the ResolveHub Admin Dashboard",
      },
      "Admin dashboard data fetched successfully"
    )
  );
});