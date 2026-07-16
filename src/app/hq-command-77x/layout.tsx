import "@/app/globals.css"; // Ensure Tailwind loads

export const metadata = {
  title: "Concentra Secure Terminal",
  description: "Authorized Personnel Only",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We use your custom --color-industrial-slate for the root background */}
      <body className="bg-industrial-slate text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}