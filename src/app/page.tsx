import ProgressBar from '@/components/ProgressBar'
import StepManager from '@/components/StepManager'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <div className="w-full max-w-xl">
        <ProgressBar />
        <StepManager />
      </div>
    </main>
  )
}
