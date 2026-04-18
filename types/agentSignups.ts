export type AgentSignup = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type AgentSignupsResponse = {
  status: "success" | "error";
  total: number;
  signups: AgentSignup[];
};
