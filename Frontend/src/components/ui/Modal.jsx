import Button from "./Button";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
      <div className="bg-light rounded-x1 p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto ">
        {children}

        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}
