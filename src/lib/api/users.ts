export interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}

export type UserDTO = User;

export function fromDto(user: UserDTO): User {
  return user;
}

export function toDto(user: User): UserDTO {
  return user;
}

/**************************************************/

// Fetch current user
export async function fetchCurrentUser(): Promise<User> {
  const res = await fetch(`/api/users/me`);
  if (!res.ok) throw new Error("Failed to fetch current user");

  const dto: UserDTO = await res.json();
  return fromDto(dto);
}
