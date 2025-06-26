'use client'

import { useLeadStore } from '@/store/leadStore'

const TOTAL_STEPS = 6

export default function ProgressBar() {
  const step = useLeadStore((state) => state.step)
  const percent = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-full bg-blue-500 transition-all duration-500 rounded"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  )
}
