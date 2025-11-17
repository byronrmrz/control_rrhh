import Header from "./Header";
import Footer from "./footer";

export default function Layout({children}) {
  return (
    <div className="bg-light min-h-screen flex flex-col">
        <Header/>

        <main className="flex-1 px-6 py-6">
            {children}
        </main>

        <Footer />

    </div>
  );
}