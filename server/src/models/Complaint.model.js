import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Road",
        "Electricity",
        "Water Supply",
        "Garbage",
        "Drainage",
        "Street Light",
        "Public Property",
        "Traffic",
        "Healthcare",
        "Other",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected",
      ],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Urgent",
      ],
      default: "Medium",
    },

    images: [
      {
        url: {
          type: String,
        },

        public_id: {
          type: String,
        },
      },
    ],

    location: {
      address: String,
      city: String,
      state: String,
      pincode: String,

      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    replies: [
      {
        sender: {
          type: String,
          enum: ["user", "admin"],
        },

        message: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    statusHistory: [
      {
        status: String,

        message: String,

        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    resolution: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

complaintSchema.index({ createdBy: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ category: 1 });
complaintSchema.index({ createdAt: -1 });

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;