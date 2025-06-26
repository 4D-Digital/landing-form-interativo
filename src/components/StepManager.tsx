'use client'

import { useLeadStore } from '@/store/leadStore'
import StepVideo from './steps/StepVideo'
import StepNome from './steps/StepNome'
import StepTelefone from './steps/StepTelefone'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'

export default function StepManager() {
  const step = useLeadStore((state) => state.step)

  const steps = [
    <StepVideo key="video" />,
    <StepNome key="nome" />,
    <StepTelefone key="telefone" />,
    <Step1 key="p1" />,
    <Step2 key="p2" />,
    <Step3 key="p3" />,
  ]

  return (
    <div className="mt-6">
      {steps[step]}
    </div>
  )
}
