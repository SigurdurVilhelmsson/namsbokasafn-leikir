import { useState } from 'react';
import { ELEMENTS } from '../data/elements';

interface PeriodicTableProps {
  onClose: () => void;
}

export function PeriodicTable({ onClose }: PeriodicTableProps) {
  const [search, setSearch] = useState('');

  const filteredElements = ELEMENTS.filter(
    el =>
      el.symbol.toLowerCase().includes(search.toLowerCase()) ||
      el.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Lotukerfið</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Leita að frumefni..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none mb-4"
          />

          <div className="overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredElements.map((element) => (
                <div
                  key={element.symbol}
                  className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="text-2xl font-bold text-primary text-center mb-1">
                    {element.symbol}
                  </div>
                  <div className="text-sm text-gray-600 text-center mb-2">
                    {element.name}
                  </div>
                  <div className="text-center font-mono text-sm font-semibold text-gray-800">
                    {element.atomicMass.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    g/mol
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>Atommassi í g/mol (atómum einingarmassi)</p>
        </div>
      </div>
    </div>
  );
}
