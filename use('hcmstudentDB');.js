use("hcmstudentDB");
db.getCollection("users").find({}).pretty();

// db.users.updateMany(
//     { },  // Add your criteria to match the documents you want to update
//     { $unset: { createdDate: "" } }
//   );
