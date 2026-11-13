import { redirect } from "next/navigation";

// Sign-up lives on the login page.
export default function RegisterPage() {
  redirect("/login?mode=signup");
}
