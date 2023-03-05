import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

interface EmailPassword {
  email: string;
  password: string;
}

export const useLoginWithGoogle = () =>
  useMutation({
    mutationKey: ["useLoginWithGoogle"],
    mutationFn: () => {
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      return signInWithPopup(auth, provider);
    },
  });

export const useLoginUserWithEmail = () =>
  useMutation({
    mutationKey: ["useLoginUserWithEmail"],
    mutationFn: ({ email, password }: EmailPassword) => signInWithEmailAndPassword(auth, email, password),
  });

export const useCreateUserWithEmail = () =>
  useMutation({
    mutationKey: ["useCreateUserWithEmail"],
    mutationFn: ({ email, password }: EmailPassword) => createUserWithEmailAndPassword(auth, email, password),
  });

export const useLogout = () => useMutation(() => signOut(auth));
