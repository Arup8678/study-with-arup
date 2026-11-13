import type { Metadata } from "next";
import EnrollClient from "./EnrollClient";

export const metadata: Metadata = {
  title: "PSC IDO Complete Course — ₹299 launch offer | Study With RootX",
  description: "Enroll in the WBPSC Industrial Development Officer complete course: notes, 925+ MCQs and 10 full mock tests. Launch offer ₹299 (regular ₹499).",
};

export default function Page() {
  return <EnrollClient />;
}
