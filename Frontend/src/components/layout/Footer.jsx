import logoFooter from "../../assets/logoFooter.svg";

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary px-6 py-3">
     <div className="grid grid-rows-3">
        <div className="flex justify-end">info@grupopdc.com</div>
        <div className="flex justify-center">
            <img src={logoFooter} alt="" className="h-12 w-auto "/>
            
        </div>

        <div className="flex flex-col items-center text-xs font-light">
            <div className="h-px w-full bg-primary/40 mt-2"></div>

            Grupo PDC 2025</div>
     </div>
     
    </footer>
  );
}
