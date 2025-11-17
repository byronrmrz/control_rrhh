import { FaEdit, FaTrash } from "react-icons/fa";

export default function Table({ columns = [], data = [], onEdit, onDelete }) {
  return (
    <div>
      <div className="overflow-x-auto border border-gray">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-6 py-3 text-sm font-semibold text-primary uppercase tracking-wide"
                >
                  {col.header}
                </th>
              ))}

              {/* columna fija para acciones */}
              <th className="text-left px-6 py-3 text-sm font-semibold text-primary uppercase tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-x divide-gray-200">
            {data.map((row, index) => (
              <tr
                key={row.empleado_id || index}
                className="hover:bg-gray-100 transition"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-3 text-left whitespace-nowrap"
                  >
                    {row[col.key]}
                  </td>
                ))}

                <td className="px-6 py-3 text-left whitespace-nowrap">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                    onClick={() => onEdit(row)}
                    className="text-blue-500 hover:text-blue-800"
                  >
                    <FaEdit size={20} />
                  </button>

                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-400 hover:text-blue-800"
                  >
                    <FaTrash size={20} />
                  </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}