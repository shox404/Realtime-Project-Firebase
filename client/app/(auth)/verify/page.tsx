"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [resendDisabled, setResendDisabled] = useState(true)

  // Handle countdown for resend button
  useEffect(() => {
    if (timeLeft > 0 && resendDisabled) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setResendDisabled(false)
    }
  }, [timeLeft, resendDisabled])

  // Handle input focus and navigation
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").trim()

    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const newCode = [...verificationCode]

      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newCode[i] = pastedData.charAt(i)
        }
      }

      setVerificationCode(newCode)

      // Focus the next empty input or the last one
      const lastFilledIndex = Math.min(pastedData.length - 1, 5)
      const nextInput = document.getElementById(`code-${lastFilledIndex}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleResendCode = async () => {
    setResendDisabled(true)
    setTimeLeft(60)

    // Simulate API call to resend code
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Resending verification code to:", email)
  }

  const handleVerify = async () => {
    const code = verificationCode.join("")

    if (code.length !== 6) {
      return
    }

    setIsLoading(true)

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Verifying code:", code)
    setIsLoading(false)
    setIsVerified(true)

    // Redirect after successful verification
    setTimeout(() => {
      router.push("/sign-in")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-md">
        {isVerified ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Email Verified!</h1>
            <p className="text-muted-foreground">
              Your email has been successfully verified. Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold">Verify Your Email</h1>
              <p className="mt-2 text-muted-foreground">
                We&apos;ve sent a verification code to <span className="font-medium">{email}</span>
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      className="h-12 w-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleVerify}
                  className="w-full"
                  disabled={isLoading || verificationCode.join("").length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Didn&apos;t receive a code?{" "}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm"
                    onClick={handleResendCode}
                    disabled={resendDisabled}
                  >
                    {resendDisabled ? `Resend in ${timeLeft}s` : "Resend Code"}
                  </Button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
