// src/components/ProgressBar.tsx

'use client'

import { useLeadStore } from '@/store/leadStore'

const TOTAL_STEPS = 6

export default function ProgressBar() {
  const step = useLeadStore((state) => state.step)
  const percent = Math.round((step / TOTAL_STEPS) * 100)
  
  // Configurações do semicírculo - agora responsivo
  const strokeWidth = 12
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Semicírculo de progresso */}
      <div className="relative mb-4 w-full max-w-xs">
        <svg
          viewBox="0 0 140 82"
          className="w-full h-auto overflow-visible"
        >
          {/* Semicírculo de fundo */}
          <path
            d="M 6 70 A 64 64 0 0 1 134 70"
            stroke="#374151"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />
          
          {/* Semicírculo de progresso */}
          <path
            d="M 6 70 A 64 64 0 0 1 134 70"
            stroke="#155dfc"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray="201.06"
            strokeDashoffset={201.06 - (percent / 100) * 201.06}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        
        {/* Percentual no centro */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ top: '10px' }}>
          <span className="text-3xl font-bold text-white">
            {percent}%
          </span>
        </div>
      </div>
      
      {/* Indicadores de etapas 
      <div className="flex space-x-2">
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index < step 
                ? 'bg-orange-500' 
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>*/}
    </div>
  )
}