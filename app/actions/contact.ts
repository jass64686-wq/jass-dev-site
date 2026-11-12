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
  const topic = String(formData.get('topic') ?? '').trim().slice(0, 100)
  const message = String(formData.get('message') ?? '').trim()

  const errors: ContactState['errors'] = {}
  if (name.length < 2 || name.length > 80) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(email) || email.length > 160) errors.email = 'Please enter a valid email.'
  if (message.length < 10 || message.length > 2000) errors.message = 'Tell me a bit more (10–2000 characters).'
  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, message: 'Please fix the highlighted fields.' }
  }

  const apiKey = process.env.onboarding_api
  if (!apiKey) {
    console.error('[contact] Resend API key is not configured (onboarding_api).')
    return { status: 'error', message: 'Message delivery is temporarily unavailable. Please email me directly.' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Jass Dev <onboarding@resend.dev>',
        to: ['jass.dev39@gmail.com'],
        reply_to: email,
        subject: `New website inquiry${topic ? ` — ${topic}` : ''}`,
        text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic || 'Not specified'}\n\n${message}`,
      }),
    })

    if (!response.ok) {
      const errorDetails = await response.text()
      console.error('[contact] Resend rejected the email', response.status, errorDetails)
      return { status: 'error', message: 'I could not send your message. Please try again or email me directly.' }
    }
  } catch (error) {
    console.error('[contact] Failed to send email with Resend', error)
    return { status: 'error', message: 'I could not send your message. Please try again or email me directly.' }
  }

  return { status: 'success', message: `Thanks ${name.split(' ')[0]}! I'll get back to you within 48 hours.` }
}
