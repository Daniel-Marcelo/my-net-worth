import { getAuth, signOut } from "firebase/auth";
import { useMyQuery } from "../useMyQuery";

const auth = getAuth();
export const useSignOut = () =>
  useMyQuery({
    enabled: false,
    queryKey: ["signOut"],
    queryFn: () => signOut(auth),
  });
