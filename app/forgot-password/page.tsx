import { redirect } from "next/navigation";

// Students log in with Google, an email code or a mobile code: there is no password to reset.
export default function ForgotPasswordPage() {
  redirect("/login");
}
