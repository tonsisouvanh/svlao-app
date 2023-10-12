import Navbar from "./Navbar";
import Footer from "./Footer";

function RootLayoutPublic({ children, showSidebarAndHeader = true }) {
  return (
    <>
      <div>
        {showSidebarAndHeader && <Navbar />}
        <div className="container mx-auto p-10 min-h-screen">
          <main className="flex-grow p-4">{children}</main>
        </div>
        {showSidebarAndHeader && <Footer />}
      </div>
    </>
  );
}

export default RootLayoutPublic;
