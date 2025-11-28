import { useState } from 'react';
import { BalanceScale } from './BalanceScale';
import { WORKED_EXAMPLES } from '../data/worked-examples';

export function TutorialModule() {
  const [currentExample, setCurrentExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showBalanceDemo, setShowBalanceDemo] = useState(true);

  const example = WORKED_EXAMPLES[currentExample];
  const step = example.steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-4 animate-slide-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Kynning - Einingagreining</h2>

      {showBalanceDemo ? (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Hugtakið um jafnvægi</h3>
          <BalanceScale
            leftValue={1000}
            leftUnit="g"
            rightValue={1}
            rightUnit="kg"
            balanced={true}
          />
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowBalanceDemo(false)}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Áfram í dæmi →
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-700">
                Dæmi {currentExample + 1} af {WORKED_EXAMPLES.length}
              </h3>
              <span className="text-sm text-gray-500">
                Skref {currentStep + 1} af {example.steps.length}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-lg text-gray-700 font-medium mb-2">
                Breyta: {example.problem.value} {example.problem.from} → ? {example.problem.to}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6 min-h-[200px] animate-slide-in">
            <p className="text-lg text-gray-800 mb-4">{step.text}</p>

            {step.visual.equation && (
              <div className="text-center text-2xl font-mono bg-white rounded-lg p-4 shadow">
                {step.visual.equation}
              </div>
            )}

            {step.visual.factor && (
              <div className="text-center">
                <span className="inline-block text-xl font-mono bg-white rounded-lg px-6 py-3 shadow">
                  {step.visual.factor}
                </span>
                {step.visual.equals && (
                  <span className="text-2xl font-bold text-primary ml-4">
                    = {step.visual.equals}
                  </span>
                )}
              </div>
            )}

            {step.visual.cancel && (
              <div className="flex justify-center items-center gap-8 mt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Teljari</p>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
                    {step.visual.cancel}
                  </div>
                </div>
                <div className="text-4xl text-red-500 font-bold">✕</div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Nefnari</p>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
                    {step.visual.cancel}
                  </div>
                </div>
              </div>
            )}

            {step.visual.result && (
              <div className="text-center">
                <div className="inline-block text-3xl font-bold text-green-600 bg-green-50 rounded-lg px-8 py-4 shadow-lg">
                  {step.visual.result}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                } else if (currentExample > 0) {
                  setCurrentExample(currentExample - 1);
                  setCurrentStep(WORKED_EXAMPLES[currentExample - 1].steps.length - 1);
                } else {
                  setShowBalanceDemo(true);
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              ← Fyrra
            </button>

            <button
              onClick={() => {
                if (currentStep < example.steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else if (currentExample < WORKED_EXAMPLES.length - 1) {
                  setCurrentExample(currentExample + 1);
                  setCurrentStep(0);
                }
              }}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentExample === WORKED_EXAMPLES.length - 1 && currentStep === example.steps.length - 1}
            >
              {currentStep < example.steps.length - 1 ? 'Næsta →' : 'Næsta dæmi →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
