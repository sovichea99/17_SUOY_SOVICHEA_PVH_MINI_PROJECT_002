import { SessionProvider } from "next-auth/react";
import FooterComponent from "../../components/FooterComponent";
import NavbarComponent from "../../components/NavbarComponent";
import { auth } from "../auth";
import { Toaster } from "sileo";

export default async function SiteLayout({ children }) {
  const session = await auth();
  return (
    <>   
    <Toaster position="top-center" style={{ zIndex: 50 }} />
      <SessionProvider session={session}>
        <NavbarComponent />
        <main className="flex-1">{children}</main>
        <FooterComponent />
      </SessionProvider>
    </>
  );
}
