export const getUsers = async () => {
  const res = await fetch("/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const getUserById = async(id: string) => {
    const users = await getUsers()

    const user = users.find((u: any) => u.id === id)

    if (!user) {
        throw new Error(`User not found`)
    }

    return user;
}