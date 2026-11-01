'use server'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'message', string>>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const topic = String(formData.get('topic') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const errors: ContactState['errors'] = {}
  if (name.length < 2 || name.length > 80) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(email) || email.length > 160) errors.email = 'Please enter a valid email.'
  if (message.length < 10 || message.length > 2000) errors.message = 'Tell me a bit more (10–2000 characters).'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, message: 'Please fix the highlighted fields.' }
  }

  // TODO: deliver the message (e.g. Resend email or a database insert).
  console.log('[contact] New inquiry', { name, email, topic, length: message.length })

  return { status: 'success', message: `Thanks ${name.split(' ')[0]}! I'll get back to you within 48 hours.` }
}
