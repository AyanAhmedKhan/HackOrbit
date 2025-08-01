"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  Upload,
  FileText,
  ImageIcon,
  Download,
  Check,
  X,
  Search,
  QrCode,
  Eye,
  EyeOff,
  Globe,
  Zap,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Certificate data
const certData = {
  "DLG/HO25/PRT/0001": { name: "Rahul Singh", team: "TechVoyagers", verified: true, refNo: "KR-2025-001", type: "Participation" },
  "DLG/HO25/PRT/0002": { name: "Rahul Singh",team: "ByteGuardians", verified: true, refNo: "KR-2025-002", type: "Participation" },
  "DLG/HO25/PRT/0003": { name: "Rahul Singh",team: "CryptoCloak", verified: true, refNo: "KR-2025-003", type: "Winner" },
  "DLG/HO25/PRT/0004": { name: "Rahul Singh",team: "DataDynamos", verified: true, refNo: "KR-2025-004", type: "Runner-up" },
  "DLG/HO25/PRT/0005": { name: "Rahul Singh",team: "CodeCrafters", verified: true, refNo: "KR-2025-005", type: "Participation" },
  "DLG/HO25/MNT/0001": { name: "Rahul Singh",team: "Dr. Sarah Johnson", verified: true, refNo: "KR-2025-M001", type: "Mentor" },
  "DLG/HO25/MNT/0002": { name: "Rahul Singh",team: "Alex Chen", verified: true, refNo: "KR-2025-M002", type: "Mentor" },
  "DLG/HO25/MNT/0003": { name: "Rahul Singh",team: "Priya Sharma", verified: true, refNo: "KR-2025-M003", type: "Mentor" },
}

interface VerificationResult {
  isValid: boolean
  certId?: string
  team?: string
  refNo?: string
  type?: string
  extractedText?: string
}

export default function CertificateVerification() {
  const [mounted, setMounted] = useState(false)
  const [verificationCount, setVerificationCount] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [extractedText, setExtractedText] = useState<string>("")
  const [showExtractedText, setShowExtractedText] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [manualCertId, setManualCertId] = useState("")
  const [progress, setProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load verification count from localStorage on mount
  useEffect(() => {
    if (mounted) {
      const savedCount = localStorage.getItem("hackorbit-verification-count")
      if (savedCount) {
        setVerificationCount(Number.parseInt(savedCount, 10))
      }
    }
  }, [mounted])

  // Mouse tracking for interactive effects
  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mounted])

  // Check for URL parameters on component mount
  useEffect(() => {
    if (!mounted) return

    const urlParams = new URLSearchParams(window.location.search)
    const certIdFromUrl = urlParams.get("cert_id") || urlParams.get("ref")

    if (certIdFromUrl) {
      setManualCertId(certIdFromUrl)
      handleManualVerification(certIdFromUrl)
    }
  }, [mounted])

  // Extract certificate ID from text using regex
  const extractCertId = (text: string): string | null => {
    const patterns = [
      /DLG\/HO25\/PRT\/\d{4}/g,
      /DLG\/HO25\/MNT\/\d{4}/g,
      /KR-\d{4}-\d{3}/g,
      /KR-\d{4}-M\d{3}/g,
      /KR-[A-Z0-9]{4}-\d{4}/g,
    ]

    for (const pattern of patterns) {
      const matches = text.match(pattern)
      if (matches && matches.length > 0) {
        return matches[0]
      }
    }
    return null
  }

  // Verify certificate ID against database
  const verifyCertificate = (certId: string): VerificationResult => {
    const cert = certData[certId as keyof typeof certData]
    if (cert && cert.verified) {
      // Increment verification count
      const newCount = verificationCount + 1
      setVerificationCount(newCount)
      if (mounted) {
        localStorage.setItem("hackorbit-verification-count", newCount.toString())
      }

      return {
        isValid: true,
        certId,
        name: cert.name,
        team: cert.team,
        refNo: cert.refNo,
        type: cert.type,
      }
    }
    return { isValid: false }
  }

  // Handle manual verification
  const handleManualVerification = (certId: string) => {
    if (!certId.trim()) return

    const result = verifyCertificate(certId.trim())
    setVerificationResult(result)
  }

  // Load Tesseract.js dynamically only on client side
  const loadTesseract = async () => {
    if (typeof window === "undefined") return null

    const { createWorker } = await import("tesseract.js")
    const worker = await createWorker("eng")
    return worker
  }

  // Handle file selection
  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile) return

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a valid image file (JPG, PNG, WEBP).")
      return
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size too large. Please upload a file smaller than 10MB.")
      return
    }

    setFile(selectedFile)
    setVerificationResult(null)
    setExtractedText("")
    setProgress(0)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.onerror = () => {
      alert("Error reading file. Please try again.")
    }
    reader.readAsDataURL(selectedFile)

    // Auto-process the file
    processFile(selectedFile)
  }

  // Simulate progress updates
  const simulateProgress = (startProgress: number, endProgress: number, duration: number) => {
    const steps = 20
    const stepSize = (endProgress - startProgress) / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const newProgress = startProgress + stepSize * currentStep
      setProgress(Math.min(newProgress, endProgress))

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    return interval
  }

  // Process file with OCR
  const processFile = async (fileToProcess: File) => {
    if (!mounted) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Convert image to data URL
      setProgress(10)
      const dataUrl = await convertImageToDataUrl(fileToProcess)
      setImagePreview(dataUrl)
      setProgress(30)

      let allExtractedText = ""

      // Load Tesseract worker
      setProgress(40)
      const worker = await loadTesseract()
      if (!worker) {
        throw new Error("Failed to load OCR engine")
      }
      setProgress(50)

      // Start progress simulation
      const progressInterval = simulateProgress(50, 90, 3000)

      try {
        // Use recognize method without logger callback to avoid DataCloneError
        const result = await worker.recognize(dataUrl)

        // Clear progress simulation and set final progress
        clearInterval(progressInterval)
        setProgress(100)

        allExtractedText = result.data.text
      } catch (error) {
        clearInterval(progressInterval)
        console.error("OCR recognition error:", error)
        throw error
      }

      await worker.terminate()
      setExtractedText(allExtractedText)

      // Extract certificate ID
      const certId = extractCertId(allExtractedText)

      if (certId) {
        const verification = verifyCertificate(certId)
        setVerificationResult({
          ...verification,
          extractedText: allExtractedText,
        })
      } else {
        setVerificationResult({
          isValid: false,
          extractedText: allExtractedText,
        })
      }
    } catch (error) {
      console.error("OCR Error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error processing file. Please try again."

      setVerificationResult({
        isValid: false,
        extractedText: `Error: ${errorMessage}`,
      })

      alert(`Processing failed: ${errorMessage}`)
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  // Helper function to convert image file to data URL
  const convertImageToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          resolve(result)
        } else {
          reject(new Error("Failed to read file"))
        }
      }

      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }

      reader.readAsDataURL(file)
    })
  }

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  // Print/Download verification result
  const handlePrintDownload = () => {
    if (!verificationResult) return

    const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Certificate Verification Result</title>
        <style>
          body { 
            font-family: 'Courier New', monospace; 
            padding: 40px; 
            background: linear-gradient(135deg, #000428 0%, #004e92 100%); 
            color: #fff; 
            margin: 0;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 20px;
            padding: 40px;
            border: 2px solid #3b82f6;
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 30px;
          }
          .logos {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .logo {
            width: 120px;
            height: 80px;
            object-fit: contain;
          }
          .title {
            color: #3b82f6; 
            font-size: 32px; 
            font-weight: bold;
            margin: 20px 0;
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          .subtitle {
            color: #60a5fa;
            font-size: 18px;
            margin-bottom: 10px;
          }
          .result { 
            border: 3px solid #10b981; 
            padding: 30px; 
            border-radius: 15px; 
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
            margin-bottom: 30px;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          .invalid { 
            border-color: #ef4444; 
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          .status { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 20px; 
            text-align: center;
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          }
          .details { 
            margin: 15px 0; 
            padding: 15px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            border-left: 4px solid #3b82f6;
          }
          .detail-label {
            color: #60a5fa;
            font-weight: bold;
            display: inline-block;
            width: 180px;
          }
          .detail-value {
            color: #10b981;
            font-weight: bold;
          }
          .signature-section {
            margin-top: 40px;
            text-align: right;
            border-top: 2px solid #3b82f6;
            padding-top: 30px;
          }
          .signature {
            width: 150px;
            height: 60px;
            object-fit: contain;
            margin-bottom: 10px;
          }
          .signature-text {
            color: #60a5fa;
            font-size: 14px;
          }
          .timestamp { 
            margin-top: 30px; 
            font-size: 14px; 
            color: #9ca3af; 
            text-align: center;
            border-top: 1px solid #374151;
            padding-top: 20px;
          }
          .verification-id {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid #3b82f6;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            text-align: center;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logos">
              <img src="https://i.ibb.co/wrwMwTw9/image.png" alt="HackOrbit Logo" class="logo hackorbit-logo" height="60" />
              <img src="https://i.ibb.co/F4cy9vmH/image.png" alt="DLG Logo" class="logo dlg-logo" height="85" />
            </div>
            <div class="title">HackOrbit Certificate Verification</div>
            <div class="subtitle">Digital Learning Group (DLG) & MITS Gwalior</div>
            <div class="subtitle">National Level Online Hackathon</div>
          </div>
          
          <div class="result ${verificationResult.isValid ? "" : "invalid"}">
            <div class="status">
              ${verificationResult.isValid ? "✅ CERTIFICATE VERIFIED" : "❌ CERTIFICATE NOT VERIFIED"}
            </div>
            
            ${
              verificationResult.isValid
                ? `
              ${verificationResult.certId ? `<div class="details"><span class="detail-label">Certificate ID:</span> <span class="detail-value">${verificationResult.certId}</span></div>` : ""}
              ${verificationResult.name ? `<div class="details"><span class="detail-label">Participant Name:</span> <span class="detail-value">${verificationResult.name}</span></div>` : ""}
              ${verificationResult.type ? `<div class="details"><span class="detail-label">Certificate Type:</span> <span class="detail-value">${verificationResult.type}</span></div>` : ""}
              ${verificationResult.team ? `<div class="details"><span class="detail-label">${verificationResult.type === "Mentor" ? "Mentor Name:" : "Team Name:"}</span> <span class="detail-value">${verificationResult.team}</span></div>` : ""}
              ${verificationResult.refNo ? `<div class="details"><span class="detail-label">Reference Number:</span> <span class="detail-value">${verificationResult.refNo}</span></div>` : ""}
              
              <div class="verification-id">
                <strong>Verification ID:</strong> HO-${Date.now().toString(36).toUpperCase()}
              </div>
            `
                : `
              <div class="details">
                <span class="detail-label">Status:</span> 
                <span style="color: #ef4444;">Certificate not found in our database</span>
              </div>
            `
            }
          </div>

          ${
            verificationResult.isValid
              ? `
            <div class="signature-section">
              <img src="https://i.ibb.co/q3v6HswF/punitsir.png" alt="Faculty Signature" class="signature" />
              <div class="signature-text">
                <strong>Dr. Punit Kumar Johari</strong><br>
                Faculty Coordinator<br>
                Digital Learning Group
              </div>
            </div>
          `
              : ""
          }

          <div class="timestamp">
            <strong>Verification Details:</strong><br>
            Verified on: ${new Date().toLocaleString()}<br>
            Verification System: HackOrbit Digital Verification Portal<br>
            Total Verifications: ${verificationCount}
          </div>
        </div>
      </body>
    </html>
  `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-blue-400 font-mono">Loading verification system...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Mouse Cursor Effect */}
      <div
        className="fixed w-6 h-6 bg-blue-400/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/30"></div>

      {/* Enhanced Floating Orbs with Mouse Interaction */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            top: "10%",
            left: "10%",
          }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            top: "60%",
            right: "10%",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            bottom: "20%",
            left: "50%",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      {/* Enhanced Grid Pattern */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-xl z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="relative group-hover:animate-bounce">
                <Globe className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                HackOrbit
              </span>
            </div>
            <Button
              onClick={() => (window.location.href = "/")}
              className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Rocket className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              BACK TO HOME
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                CERTIFICATE VERIFICATION SYSTEM
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 font-mono animate-fade-in-up">
              Certificate Verification
            </h1>
            <p className="text-xl text-blue-100/80 font-mono animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <span className="text-blue-400">{">"}</span> Verify HackOrbit certificates instantly with advanced OCR
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              {/* Manual Input */}
              <Card className="group relative bg-black/40 border-blue-500/30 backdrop-blur-xl hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div className="relative mb-4">
                    <Search className="h-8 w-8 text-blue-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardTitle className="text-blue-300 font-mono text-xl group-hover:text-blue-200 transition-colors duration-300">
                    Manual Verification
                  </CardTitle>
                  <CardDescription className="text-blue-200/60 font-mono">
                    <span className="text-blue-400">{">"}</span> Enter certificate ID directly for instant verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., DLG/HO25/PRT/0001"
                      value={manualCertId}
                      onChange={(e) => setManualCertId(e.target.value)}
                      className="bg-black/40 border-blue-500/50 text-blue-300 placeholder:text-blue-400/50 font-mono backdrop-blur-sm hover:border-blue-400/70 focus:border-blue-400 transition-all duration-300"
                    />
                    <Button
                      onClick={() => handleManualVerification(manualCertId)}
                      className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-mono font-bold transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      Verify
                    </Button>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* File Upload */}
              <Card className="group relative bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div className="relative mb-4">
                    <Upload className="h-8 w-8 text-purple-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardTitle className="text-purple-300 font-mono text-xl group-hover:text-purple-200 transition-colors duration-300">
                    Upload Certificate Image
                  </CardTitle>
                  <CardDescription className="text-purple-200/60 font-mono">
                    <span className="text-purple-400">{">"}</span> Upload image for automatic OCR verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  {/* Drop Zone */}
                  <div
                    ref={dropZoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                      isDragOver
                        ? "border-purple-400 bg-purple-500/20 scale-105"
                        : "border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        {file ? (
                          <ImageIcon className="w-12 h-12 text-purple-400 animate-bounce" />
                        ) : (
                          <Upload className="w-12 h-12 text-purple-400 animate-pulse" />
                        )}
                      </div>
                      <div>
                        <p className="text-purple-300 font-mono font-semibold">
                          {file ? file.name : "Drop certificate image here or click to upload"}
                        </p>
                        <p className="text-purple-200/60 font-mono text-sm mt-2">
                          <span className="text-purple-400">{">"}</span> Supports JPG, PNG, WEBP files (max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />

                  {/* Processing Progress */}
                  {isProcessing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-purple-300 font-mono">
                        <span>
                          <span className="text-purple-400">{">"}</span> Processing with OCR...
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 animate-pulse"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Extracted Text */}
              {extractedText && (
                <Card className="group relative bg-black/40 border-cyan-500/30 backdrop-blur-xl hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-cyan-300 font-mono flex items-center gap-2 group-hover:text-cyan-200 transition-colors duration-300">
                      <FileText className="w-5 h-5" />
                      Extracted Text
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExtractedText(!showExtractedText)}
                        className="ml-auto text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20"
                      >
                        {showExtractedText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  {showExtractedText && (
                    <CardContent className="relative">
                      <div className="bg-black/60 p-4 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
                        <pre className="text-cyan-100 font-mono text-sm whitespace-pre-wrap overflow-auto max-h-40">
                          {extractedText}
                        </pre>
                      </div>
                    </CardContent>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Card>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Image Preview */}
              {imagePreview && (
                <Card className="group relative bg-black/40 border-green-500/30 backdrop-blur-xl hover:border-green-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-green-300 font-mono group-hover:text-green-200 transition-colors duration-300">
                      Certificate Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Certificate preview"
                        className="w-full h-auto rounded-lg border border-green-500/20 transition-transform duration-300 group-hover:scale-105"
                      />
                      {verificationResult && (
                        <div className="absolute top-4 right-4">
                          <Badge
                            className={`${
                              verificationResult.isValid
                                ? "bg-green-500/20 text-green-300 border-green-500/50"
                                : "bg-red-500/20 text-red-300 border-red-500/50"
                            } font-mono animate-pulse`}
                          >
                            {verificationResult.isValid ? "✅ VERIFIED" : "❌ INVALID"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Card>
              )}

              {/* Verification Result */}
              {verificationResult && (
                <Card
                  className={`group relative backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden ${
                    verificationResult.isValid
                      ? "bg-green-500/10 border-green-500/30 hover:border-green-400/60"
                      : "bg-red-500/10 border-red-500/30 hover:border-red-400/60"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${verificationResult.isValid ? "from-green-500/10" : "from-red-500/10"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <CardHeader className="relative">
                    <CardTitle
                      className={`font-mono flex items-center gap-2 text-xl ${
                        verificationResult.isValid
                          ? "text-green-300 group-hover:text-green-200"
                          : "text-red-300 group-hover:text-red-200"
                      } transition-colors duration-300`}
                    >
                      {verificationResult.isValid ? (
                        <Check className="w-8 h-8 animate-pulse" />
                      ) : (
                        <X className="w-8 h-8 animate-pulse" />
                      )}
                      Verification Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative">
                    <Alert
                      className={`${
                        verificationResult.isValid
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-red-500/50 bg-red-500/10"
                      } backdrop-blur-sm`}
                    >
                      <AlertDescription
                        className={`font-mono text-lg font-bold ${
                          verificationResult.isValid ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {verificationResult.isValid
                          ? "✅ Certificate Verified Successfully"
                          : "❌ Certificate not found or invalid"}
                      </AlertDescription>
                    </Alert>

                    {verificationResult.isValid && (
                      <div className="space-y-3">
                        {verificationResult.certId && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
                            <span className="text-green-200/80 font-mono">Certificate ID:</span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.certId}</span>
                          </div>
                        )}

                        {verificationResult.type && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
                            <span className="text-green-200/80 font-mono">Certificate Type:</span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.type}</span>
                          </div>
                        )}

                        {verificationResult.name && (
  <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
    <span className="text-green-200/80 font-mono">Participant Name:</span>
    <span className="text-green-300 font-mono font-bold">{verificationResult.name}</span>
  </div>
)}

                        {verificationResult.team && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
                            <span className="text-green-200/80 font-mono">
                              {verificationResult.type === "Mentor" ? "Mentor Name:" : "Team Name:"}
                            </span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.team}</span>
                          </div>
                        )}

                        {verificationResult.refNo && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm">
                            <span className="text-green-200/80 font-mono">Reference Number:</span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.refNo}</span>
                          </div>
                        )}

                        <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm">
                          <span className="text-green-200/80 font-mono">Verified On:</span>
                          <span className="text-green-300 font-mono">{new Date().toLocaleString()}</span>
                        </div>
                      </div>
                    )}

                    {/* Print/Download Button */}
                    <Button
                      onClick={handlePrintDownload}
                      className="group w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold font-mono text-lg py-3 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <Download className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                      Print/Download Verification Result
                    </Button>
                  </CardContent>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${verificationResult.isValid ? "from-green-500 to-green-300" : "from-red-500 to-red-300"} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                </Card>
              )}

              {/* QR Code Info */}
              <Card className="group relative bg-black/40 border-yellow-500/30 backdrop-blur-xl hover:border-yellow-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-yellow-300 font-mono flex items-center gap-2 group-hover:text-yellow-200 transition-colors duration-300">
                    <QrCode className="w-5 h-5 animate-pulse" />
                    QR Code Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3 text-yellow-100/80 font-mono text-sm">
                    <p>
                      <span className="text-yellow-400">{">"}</span> Scan QR codes on certificates for instant
                      verification
                    </p>
                    <p>
                      <span className="text-yellow-400">{">"}</span> QR codes contain direct links to this verification
                      page
                    </p>
                    <p>
                      <span className="text-yellow-400">{">"}</span> Format: verify?cert_id=DLG/HO25/PRT/0001
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Verification Counter */}
              <Card className="group relative bg-black/40 border-emerald-500/30 backdrop-blur-xl hover:border-emerald-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-emerald-300 font-mono flex items-center gap-2 group-hover:text-emerald-200 transition-colors duration-300">
                    <Zap className="w-5 h-5 animate-pulse" />
                    Verification Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400 font-mono mb-2 animate-pulse">
                      {verificationCount.toLocaleString()}
                    </div>
                    <p className="text-emerald-100/80 font-mono text-sm">
                      <span className="text-emerald-400">{">"}</span> Total certificates verified
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-black/40 p-3 rounded-lg border border-emerald-500/20">
                        <div className="text-emerald-300 font-bold">ACTIVE</div>
                        <div className="text-emerald-100/60">24/7 System</div>
                      </div>
                      <div className="bg-black/40 p-3 rounded-lg border border-emerald-500/20">
                        <div className="text-emerald-300 font-bold">SECURE</div>
                        <div className="text-emerald-100/60">OCR Powered</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
