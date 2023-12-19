import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export enum UserType { student, teacher }

export class User {
  readonly type?: UserType;
  readonly name?: string;

  get isTeacher(): boolean { return this.type == UserType.teacher; };

  constructor(type?: UserType, name?: string) {
    this.type = type;
    this.name = name;
  }
};

type ContextType = {
  user: User;
  setType: (type: UserType) => void;
  setName: (name: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<ContextType>({
  user: new User(),
  setType: () => console.error("UserContext used without Provider"),
  setName: () => console.error("UserContext used without Provider"),
});

export function UserProvider({ children }: Props) {
  const [type, setType] = useLocalStorage<UserType>("userType");
  const [name, setName] = useLocalStorage<string>("userName");
  const [user, setUser] = useState(new User(type, name));

  useEffect(() => {
    setUser(new User(type, name));
  }, [type, name]);

  return (
    <UserContext.Provider
      value={{
        user,
        setType(type) {
          setType(type);
          setName(undefined);
        },
        setName
      }}
      children={children}
    />
  );
}

export default function useUser() {
  return useContext(UserContext);
}