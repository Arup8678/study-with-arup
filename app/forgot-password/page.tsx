import { redirect } from "next/navigation";

// "Forgot password?" is a step on the login page.
export default function ForgotPasswordPage() {
  redirect("/login");
}
