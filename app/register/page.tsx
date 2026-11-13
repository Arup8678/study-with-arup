import { redirect } from "next/navigation";

// Sign-up and login are the same passwordless flow now.
export default function RegisterPage() {
  redirect("/login");
}
