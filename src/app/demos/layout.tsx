import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demonstrações | Qodec",
  description: "Explore sistemas reais implementados. Demos interativas de landing pages, funis de vendas e dashboards.",
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
    </div>
  );
}
