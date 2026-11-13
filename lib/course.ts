// Shared config for the paid PSC IDO course (used by client and server code).

export const IDO_COURSE = {
  id: "psc-ido-2026",
  title: "WBPSC IDO Complete Course 2026",
  regularPrice: 499,
  offerPrice: 299,
  // To change the QR, replace public/payment-qr.png (keep the same file name) and update upiId/payeeName.
  qrImagePath: "/payment-qr.png",
  upiId: process.env.NEXT_PUBLIC_UPI_ID || "amitsahu9083-2@oksbi",
  payeeName: process.env.NEXT_PUBLIC_UPI_PAYEE || "AMIT SAHU",
  supportPhone: "8944907578",
  features: [
    "Chapter-wise notes for all 7 IDO subjects",
    "925+ MCQs with explanations",
    "10 full-length mock tests with answer keys & OMR",
    "WB Industrial Scenario special capsule",
    "3-month study plan + doubt support on WhatsApp",
  ],
} as const;

export const ENROLL_STORAGE_KEY = "rootx_ido_enrollment";

export type EnrollmentStatus = "pending" | "approved" | "rejected";

export type Enrollment = {
  id?: string;
  course_id: string;
  name: string;
  phone: string;
  utr: string;
  amount: number;
  status: EnrollmentStatus;
  created_at: string;
  reviewed_at?: string | null;
  user_id?: string | null;
  email?: string | null;
};

export const STATUS_LABEL: Record<EnrollmentStatus, string> = {
  pending: "Payment verification pending",
  approved: "Verified",
  rejected: "Payment not verified",
};

/** UPI UTR / RRN is exactly 12 digits. */
export const UTR_REGEX = /^\d{12}$/;
/** Indian mobile: 10 digits starting 6-9. */
export const PHONE_REGEX = /^[6-9]\d{9}$/;

export function normaliseUtr(v: string) {
  return v.replace(/\s+/g, "");
}

export function normalisePhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

export function validateEnrollment(input: { name?: string; phone?: string; utr?: string }) {
  const name = (input.name || "").trim();
  const phone = normalisePhone(input.phone || "");
  const utr = normaliseUtr(input.utr || "");
  if (name.length < 2 || name.length > 80) return { error: "Please enter your full name." } as const;
  if (!PHONE_REGEX.test(phone)) return { error: "Please enter a valid 10-digit mobile number." } as const;
  if (!UTR_REGEX.test(utr)) return { error: "UTR must be exactly 12 digits. You can find it in your UPI app under the payment details." } as const;
  if (/^(\d)\1{11}$/.test(utr) || utr === "123456789012") return { error: "That UTR doesn't look real. Please copy it from your UPI app." } as const;
  return { name, phone, utr } as const;
}

export function upiDeepLink() {
  // pa is left unencoded ("@" must stay literal for some UPI apps).
  return `upi://pay?pa=${IDO_COURSE.upiId}&pn=${encodeURIComponent(IDO_COURSE.payeeName)}&am=${IDO_COURSE.offerPrice}&cu=INR&tn=${encodeURIComponent("RootX IDO Course")}`;
}
