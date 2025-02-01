import Joi from "joi";

export const validateLoginInput = (data) => {
  const schema = Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

export const userSchema = Joi.object({
  userId: Joi.string().optional(),
  fullname: Joi.object({
    englishFirstname: Joi.string().required(),
    englishLastname: Joi.string().required(),
    nickName: Joi.string().optional(),
    laoName: Joi.string().optional(),
  }).required(),
  university: Joi.object({
    universityId: Joi.string().optional(), // Assuming ObjectId is a string
    shortcut: Joi.string().optional(),
  }).optional(),
  scholarship: Joi.object({
    scholarshipUniversity: Joi.string().optional(),
    scholarshipLao: Joi.string().optional(),
    scholarshipVn: Joi.string().optional(),
    scholarshipType: Joi.string().optional(),
  }).optional(),
  duration: Joi.object({
    from: Joi.string().optional(),
    to: Joi.string().optional(),
  }).optional(),
  dob: Joi.date().optional(),
  phone: Joi.object({
    emergency: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    relationship: Joi.string().optional(),
  }).optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  degree: Joi.object({
    vietDegree: Joi.string().optional(),
    laoDegree: Joi.string().optional(),
  }).optional(),
  facebookUrl: Joi.string().uri().optional(),
  visa: Joi.object({
    from: Joi.date().optional(),
    to: Joi.date().optional(),
  }).optional(),
  userStatus: Joi.string().valid("pending", "active", "inactive").optional(),
  residenceAddress: Joi.object({
    location: Joi.string().optional(),
    address: Joi.string().optional(),
  }).optional(),
  province: Joi.string().optional(),
  passport: Joi.object({
    img: Joi.string().optional().empty(""),
    passportNo: Joi.string().optional(),
    expired: Joi.date().optional(),
  }).optional(),
  major: Joi.object({
    laoMajor: Joi.string().optional(),
    vietMajor: Joi.string().optional(),
  }).optional(),
  profileImg: Joi.string().optional().empty(""),
  emailAddress: Joi.string().email().required(),
  role: Joi.string().valid("user", "admin").optional(),
  studentId: Joi.string().optional(),
  refreshToken: Joi.string().optional(),
  lastLogin: Joi.date().optional(),
});
