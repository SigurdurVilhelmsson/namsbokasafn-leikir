import { useState } from 'react';
import { CONVERSION_FACTORS } from '../data/conversion-factors';

type Category = 'length' | 'mass' | 'volume' | 'time';

export function ReferenceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('mass');

  const categoryNames: Record<Category, string> = {
    length: 'Lengd',
    mass: 'Massi',
    volume: 'Rúmmál',
    time: 'Tími'
  };

  return (
    <div className="max-w-5xl mx-auto p-4 animate-slide-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Uppflettirit</h2>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(CONVERSION_FACTORS) as Category[]).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {categoryNames[category]}
          </button>
        ))}
      </div>

      {/* Conversion factors */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Umbreytingarstuðlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONVERSION_FACTORS[selectedCategory].map((factor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="font-mono text-lg font-bold text-gray-800 mb-2">
                1 {factor.from} = {factor.factor} {factor.to}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {factor.name}
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-blue-100 rounded px-3 py-2 text-sm">
                  <span className="font-mono">{factor.to} / {factor.from}</span>
                </div>
                <div className="flex-1 bg-green-100 rounded px-3 py-2 text-sm">
                  <span className="font-mono">{factor.from} / {factor.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common mistakes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Algengar villur</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h4 className="font-bold text-red-800 mb-2">❌ Villa: Stuðull snýr röngu megin</h4>
            <p className="text-red-700 mb-2">
              <span className="font-mono">1000 g × (1000 g / 1 kg) = 1,000,000 g²/kg</span>
            </p>
            <p className="text-red-600 text-sm">
              Einingarnar strikast ekki út! Þetta gerist þegar við veljum ranga stefnu á stuðlinum.
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
            <h4 className="font-bold text-green-800 mb-2">✓ Rétt: Stuðullinn snýr rétt</h4>
            <p className="text-green-700 mb-2">
              <span className="font-mono">1000 g × (1 kg / 1000 g) = 1 kg</span>
            </p>
            <p className="text-green-600 text-sm">
              'g' er í teljara upphafsgildis og nefnara stuðuls, þannig að það strikast út. Rétt!
            </p>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h4 className="font-bold text-red-800 mb-2">❌ Villa: Að gleyma milliskrefi</h4>
            <p className="text-red-700 mb-2">
              Breyta beint úr km í cm án þess að fara í gegnum metra
            </p>
            <p className="text-red-600 text-sm">
              Stundum þarf að nota marga stuðla í röð til að komast að réttum einingu.
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
            <h4 className="font-bold text-green-800 mb-2">✓ Rétt: Nota keðju af stuðlum</h4>
            <p className="text-green-700 mb-2">
              <span className="font-mono">2 km × (1000 m / 1 km) × (100 cm / 1 m) = 200,000 cm</span>
            </p>
            <p className="text-green-600 text-sm">
              Við notum tvær umbreytingar: fyrst í metra, síðan í sentímetra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
