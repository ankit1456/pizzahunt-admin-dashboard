export const isAuthorized = (role: string) => {
  const allowedRoles = ["admin", "manager"];

  return allowedRoles.includes(role);
};
