import { Globe } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Globe className="h-16 w-16 text-blue-400 animate-spin mx-auto mb-4" />
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono">
          Loading Verification System...
        </h1>
      </div>
    </div>
  )
}
