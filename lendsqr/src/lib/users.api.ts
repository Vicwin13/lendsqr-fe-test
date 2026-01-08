const MOCKY_URL = `https://mocki.io/v1/6711c42c-4272-4848-a2f8-d586326c4bfd`;


export const getUsers = async () => {
 
  try {
    const res = await fetch(`${MOCKY_URL}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
    }
    
    return res.json();
  } catch (error) {
    console.error("Mocky fetch failed")
    return [];
 }
 
 

};

export const getUserById = async(id: string) => {
  const user = await getUsers()

  return user.find((u: any) => String(u.id) ===  String(id));
};
