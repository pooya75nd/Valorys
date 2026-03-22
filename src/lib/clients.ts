import Stripe from 'stripe'
import { Resend } from 'resend'
import Anthropic from '@anthropic-ai/sdk'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const resend = new Resend(process.env.RESEND_API_KEY!)

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})
