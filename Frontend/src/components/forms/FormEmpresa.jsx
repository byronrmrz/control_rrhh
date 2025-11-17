import Button from "../ui/Button";

export default function FormEmpresa({ fields, onSubmit, title }) {
  return (
    <form onSubmit={onSubmit} className="bg-light p-8 rounded-xl space-y-4">
      {title && <h2 className="text-lg text-primary font-semibold mb-4">{title}</h2>}

      {fields.map((f, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <label className="text-sm text-text">{f.label}</label>

          {f.type === "select" ? (
            <select
              className="border rounded-md px-3 py-2"
              value={f.value}
              onChange={f.onChange}
              required={!!f.required}
              disabled={!!f.disabled}
            >
              <option value="">Seleccione...</option>
              {Array.isArray(f.options) &&
                f.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
            </select>
          ) : (
            <input
              type={f.type || "text"}
              className="border rounded-md px-3 py-2"
              placeholder={f.placeholder}
              value={f.value}
              onChange={f.onChange}
              required={!!f.required}
            />
          )}
        </div>
      ))}

      <Button type="submit" variant="primary">
        Guardar
      </Button>
    </form>
  );
}