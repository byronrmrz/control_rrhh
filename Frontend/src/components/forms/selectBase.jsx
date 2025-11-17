export default function SelectBase({ value, onChange, options }) {
  return (
    <select
      className="border rounded-md px-3 py-2"
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Seleccione...</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}