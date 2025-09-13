import Footer from "@/components/footer";
import NavigationMenuBar from "@/components/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationMenuBar />
      {children}
      <Footer />
    </>
  );
}
