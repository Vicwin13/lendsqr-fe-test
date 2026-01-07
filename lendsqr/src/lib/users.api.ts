export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const getUserById = async(id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};
