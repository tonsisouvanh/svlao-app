import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    fullname: {
      englishFirstname: {
        type: String,
        required: true,
      },
      englishLastname: {
        type: String,
        required: true,
      },
      nickName: String,
      laoName: String,
    },
    university: {
      universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
      },
      shortcut: {
        type: String,
      },
    },
    scholarship: {
      scholarshipUniversity: String,
      scholarshipLao: String,
      scholarshipVn: String,
      scholarshipType: String,
    },
    duration: {
      from: String,
      to: String,
    },
    dob: {
      type: Date,
      default: new Date(),
    },
    phone: {
      emergency: String,
      phoneNumber: {
        type: String,
      },
      relationship: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    degree: {
      vietDegree: String,
      laoDegree: String,
    },
    facebookUrl: String,
    visa: {
      from: {
        type: Date,
        default: new Date(),
      },
      to: {
        type: Date,
        default: new Date(),
      },
    },
    userStatus: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "inactive",
    },
    residenceAddress: {
      location: String,
      address: String,
    },
    province: String,
    passport: {
      img: String,
      passportNo: String,
      expired: {
        type: Date,
        default: new Date(),
      },
    },
    major: {
      laoMajor: String,
      vietMajor: String,
    },
    profileImg: { type: String, default: "https://#" },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    studentId: {
      type: String,
    },
    refreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
