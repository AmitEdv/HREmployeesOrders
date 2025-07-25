const BASE_URL = "http://localhost:3001"; // backend server

export const getRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests`);
  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }
  return await res.json();
};

export const submitRequest = async (user_name, note) => {
  const res = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_name, note }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to submit request");
  }

  return data;
};

export const deleteAllRequests = async () => {
    const res = await fetch(`${BASE_URL}/requests`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete all");
  return res.json();
};