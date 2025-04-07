interface userI {
  username?: string;
  email?: string;
  motivation?: string;
  password?: string;
  role?: string;
  status?: "pending" | "approved" | "ban";
}

export default userI;
