export interface Message {
  title: string;
  message: string;
  isPrivate: boolean;
  userId: string;
  userName: string;
}

export interface User {
  email: string;
  name: string;
  password: string | null;
}

export interface userJWT {
  id: string;
  name: string;
  email: string;
  password: string;
}
