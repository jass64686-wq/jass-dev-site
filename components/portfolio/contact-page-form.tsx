'use client'

import { useState } from 'react'
import { ContactForm } from './contact-dialog'

export function ContactPageForm() {
  const [formKey, setFormKey] = useState(0)
  return <ContactForm key={formKey} onDone={() => setFormKey((k) => k + 1)} doneLabel="Send another message" />
}
