'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={className}
    >
      {pending ? 'Guardando...' : children}
    </button>
  )
}