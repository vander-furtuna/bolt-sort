import { Plus, X } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'

interface ExtensionInputProps {
  onCreateExtension: (name: string) => void
}

export function ExtensionInput({ onCreateExtension }: ExtensionInputProps) {
  const [isAdding, setIsAdding] = useState(false)
  const spanRef = useRef<HTMLSpanElement>(null)

  const handleKeyDown = () => {
    if (spanRef.current && spanRef.current.innerText.trim().length > 0) {
      onCreateExtension(spanRef.current.innerText)
      spanRef.current.innerText = ' '
      spanRef.current.focus()
      setIsAdding(false)
    }
  }

  useEffect(() => {
    if (isAdding && spanRef.current) {
      spanRef.current.focus()
    }
  }, [isAdding])

  return (
    <>
      {isAdding ? (
        <div className="flex items-center gap-2 rounded-md bg-yellow-300 px-2 py-0.5">
          <span
            ref={spanRef}
            className="flex w-fit min-w-6 max-w-fit text-sm font-bold text-stone-800 outline-none"
            contentEditable
            onKeyDownCapture={(event) =>
              event.key === 'Enter' && handleKeyDown()
            }
          />
          <Plus
            size={16}
            className="text-stone-800"
            weight="bold"
            onClick={handleKeyDown}
          />
          <X
            size={16}
            className="text-stone-800"
            weight="bold"
            onClick={() => setIsAdding(false)}
          />
        </div>
      ) : (
        <button
          className="flex w-8 items-center justify-center rounded-md bg-stone-750 px-2 py-0.5 text-sm text-yellow-300"
          onClick={() => setIsAdding(true)}
        >
          +
        </button>
      )}
    </>
  )
}
