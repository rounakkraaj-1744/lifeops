import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react'

interface OTPInputProps {
    length?: number
    value: string
    onChange: (value: string) => void
    error?: string
    disabled?: boolean
}

export function OTPInput({
    length = 6,
    value,
    onChange,
    error,
    disabled = false
}: OTPInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [focusedIndex, setFocusedIndex] = useState(-1)

    const handleChange = (index: number, inputValue: string) => {
        // Only allow numbers
        const digit = inputValue.replace(/\D/g, '').slice(-1)

        const newValue = value.split('')
        newValue[index] = digit
        const updatedValue = newValue.join('').slice(0, length)

        onChange(updatedValue)

        // Move to next input if digit entered
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!value[index] && index > 0) {
                // Move to previous input on backspace if current is empty
                inputRefs.current[index - 1]?.focus()
            } else {
                // Clear current input
                const newValue = value.split('')
                newValue[index] = ''
                onChange(newValue.join(''))
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault()
            inputRefs.current[index - 1]?.focus()
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            e.preventDefault()
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
        onChange(pastedData)

        // Focus the next empty input or the last one
        const nextIndex = Math.min(pastedData.length, length - 1)
        inputRefs.current[nextIndex]?.focus()
    }

    const handleFocus = (index: number) => {
        setFocusedIndex(index)
        // Select the input content on focus
        inputRefs.current[index]?.select()
    }

    const handleBlur = () => {
        setFocusedIndex(-1)
    }

    return (
        <div className="otp-container">
            <div className="otp-inputs" role="group" aria-label="One-time verification code">
                {Array.from({ length }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={value[index] || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className={`otp-input ${error ? 'otp-input-error' : ''} ${focusedIndex === index ? 'otp-input-focused' : ''}`}
                        aria-label={`Digit ${index + 1} of ${length}`}
                        autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    />
                ))}
            </div>
            {error && (
                <p className="otp-error" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
