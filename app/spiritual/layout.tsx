import SpiritualNav from "@/components/spiritual/SpiritualNav";

export default function SpiritualLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SpiritualNav />
      {children}
    </div>
  );
}
