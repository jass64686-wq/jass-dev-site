'use client'

import { useActionState, useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const TOPICS = ['New website', 'E-commerce store', 'Funnel / GHL', 'Freelance', 'Just saying hi']
const initialState: ContactState = { status: 'idle' }

export function ContactForm({ onDone, doneLabel = 'Close' }: { onDone: () => void; doneLabel?: string }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState)
  const [topic, setTopic] = useState(TOPICS[0])

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-gradient text-white">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </div>
        <p className="text-base font-medium text-foreground" role="status">
          {state.message}
        </p>
        <Button onClick={onDone} variant="outline" className="rounded-full">
          {doneLabel}
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-4" noValidate>
      {state.status === 'error' && (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Tony Stark"
            required
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? 'contact-name-error' : undefined}
          />
          {state.errors?.name && (
            <p id="contact-name-error" className="text-xs text-destructive">
              {state.errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            required
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? 'contact-email-error' : undefined}
          />
          {state.errors?.email && (
            <p id="contact-email-error" className="text-xs text-destructive">
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <fieldset className="grid gap-1.5">
        <legend className="mb-1.5 text-sm font-medium">{"What's this about?"}</legend>
        <input type="hidden" name="topic" value={topic} />
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={topic === option}
              onClick={() => setTopic(option)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                topic === option
                  ? 'border-transparent bg-brand-gradient text-white'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell me about your idea, timeline and budget..."
          required
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? 'contact-message-error' : undefined}
        />
        {state.errors?.message && (
          <p id="contact-message-error" className="text-xs text-destructive">
            {state.errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-11 rounded-full bg-brand-gradient text-white hover:opacity-90"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {pending ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
