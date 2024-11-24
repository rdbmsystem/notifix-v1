import Footer from "./Footer";
import NavBar from "./NavBar";

export const Layout = ({ authUser, children }) => {
  return (
    <div className="min-h-screen flex flex-col  ">
      <div className="bg-base-100 flex-1">
        <NavBar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </div>
      <div className="border border-t-base-200">
        {!authUser ? <Footer /> : null}
      </div>
    </div>
  );
};
