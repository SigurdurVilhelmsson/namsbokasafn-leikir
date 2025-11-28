interface BalanceScaleProps {
  leftValue: number;
  leftUnit: string;
  rightValue: number;
  rightUnit: string;
  balanced: boolean;
}

export function BalanceScale({ leftValue, leftUnit, rightValue, rightUnit, balanced }: BalanceScaleProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white rounded-xl">
      <div className={`relative w-full max-w-md ${balanced ? 'animate-balance' : ''}`}>
        {/* Fulcrum */}
        <div className="absolute left-1/2 top-16 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-transparent border-b-gray-700"></div>

        {/* Balance beam */}
        <div className={`h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full shadow-lg transition-transform duration-1000 ${balanced ? 'rotate-0' : 'rotate-3'}`}>
          {/* Left pan */}
          <div className="absolute left-0 -top-12 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-32 h-24 bg-yellow-400 rounded-b-full border-4 border-yellow-600 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{leftValue}</div>
                <div className="text-sm font-semibold text-gray-700">{leftUnit}</div>
              </div>
            </div>
            <div className="w-1 h-8 bg-gray-600"></div>
          </div>

          {/* Right pan */}
          <div className="absolute right-0 -top-12 transform translate-x-1/2 flex flex-col items-center">
            <div className="w-32 h-24 bg-yellow-400 rounded-b-full border-4 border-yellow-600 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{rightValue}</div>
                <div className="text-sm font-semibold text-gray-700">{rightUnit}</div>
              </div>
            </div>
            <div className="w-1 h-8 bg-gray-600"></div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <p className="text-lg font-semibold text-gray-700">
          {leftValue} {leftUnit} = {rightValue} {rightUnit}
        </p>
        <p className="text-md text-gray-600 mt-2">
          þannig að <span className="font-bold text-primary">{leftValue} {leftUnit} / {rightValue} {rightUnit} = 1</span>
        </p>
      </div>
    </div>
  );
}
