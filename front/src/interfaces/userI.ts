interface userI {
  _id?: string;
  username?: string;
  email?: string;
  motivation?: string;
  password?: string;
  role?: string;
  status?: "pending" | "approved" | "ban";
}

export default userI;
