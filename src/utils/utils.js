export const checkRole = (role) => {
  let approve = false;
  switch (role) {
    case "admin":
      approve = true;
      break;
    case "assistant":
      approve = true;
      break;
    case "student":
      approve = true;
      break;
    default:
      break;
  }
  return approve;
};
