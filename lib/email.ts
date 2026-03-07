import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "")
}

function baseTemplate(title: string, content: string) {
  return `
  <div style="background:#F1F5F9;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0F172A;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
      <div style="padding:24px 24px 12px;background:linear-gradient(135deg,#0EA5E9 0%,#22C55E 100%);color:#ffffff;">
        <div style="font-size:24px;font-weight:700;letter-spacing:0.2px;">LifeSignal</div>
        <div style="margin-top:6px;font-size:13px;opacity:0.92;">Peace of mind for the people you love most.</div>
      </div>
      <div style="padding:24px;">
        <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:#0F172A;">${title}</h1>
        <div style="font-size:16px;line-height:1.65;color:#334155;">
          ${content}
        </div>
      </div>
      <div style="padding:18px 24px;border-top:1px solid #E2E8F0;font-size:12px;line-height:1.6;color:#64748B;">
        LifeSignal helps families make sure loved ones living alone are safe.
      </div>
    </div>
  </div>
  `
}

export function buildReferralLink(referralCode: string) {
  return `${getSiteUrl()}/beta?ref=${encodeURIComponent(referralCode)}`
}

export function buildWelcomeEmail(referralCode: string) {
  const referralLink = buildReferralLink(referralCode)

  return {
    subject: "Welcome to LifeSignal",
    html: baseTemplate(
      "Welcome to LifeSignal",
      `
      <p>You’re officially on the LifeSignal early access waitlist.</p>

      <p><strong>LifeSignal exists for a simple reason:</strong> families worry about loved ones who live alone.</p>

      <p>Our platform sends simple daily check-ins. If someone does not respond, trusted contacts are notified.</p>

      <p>That small signal can create real peace of mind.</p>

      <p>Your personal referral link:</p>

      <p style="word-break:break-word;">
        <a href="${referralLink}" style="color:#0EA5E9;font-weight:700;">${referralLink}</a>
      </p>

      <p>Invite others to move up the waitlist.</p>

      <p>— The LifeSignal Team</p>
      `
    ),
  }
}

export function buildReferralEmail(referralCode: string) {
  const referralLink = buildReferralLink(referralCode)

  return {
    subject: "Share your LifeSignal referral link",
    html: baseTemplate(
      "Move up the LifeSignal waitlist",
      `
      <p>You’re already on the waitlist.</p>

      <p><strong>Want earlier access?</strong> Share your personal referral link with family and friends.</p>

      <p style="word-break:break-word;">
        <a href="${referralLink}" style="color:#0EA5E9;font-weight:700;">${referralLink}</a>
      </p>

      <p>Every successful referral moves you higher on the list.</p>

      <p>Families everywhere are looking for a better way to protect loved ones living alone. Your invite could help someone discover LifeSignal.</p>

      <p>— LifeSignal</p>
      `
    ),
  }
}

export function buildStoryEmail() {
  return {
    subject: "Why LifeSignal exists",
    html: baseTemplate(
      "Why LifeSignal exists",
      `
      <p>Every day, families ask the same question:</p>

      <p><strong>“Is my parent okay?”</strong></p>

      <p>Many people live independently, and that independence matters. But it can also create constant worry.</p>

      <p>What if something happens and no one knows?</p>

      <p>LifeSignal was created to solve that problem with a simple daily check-in and a trusted alert network if someone does not respond.</p>

      <p>Because every life deserves to be noticed.</p>

      <p>— The LifeSignal Team</p>
      `
    ),
  }
}

export function buildEarlyAccessEmail(referralCode: string) {
  const referralLink = buildReferralLink(referralCode)

  return {
    subject: "LifeSignal early access is coming",
    html: baseTemplate(
      "LifeSignal early access is coming",
      `
      <p>We’re getting close to launching the first version of LifeSignal.</p>

      <p>Early users will be able to:</p>

      <ul>
        <li>Set daily safety check-ins</li>
        <li>Add family guardians</li>
        <li>Receive alerts if someone misses a check-in</li>
        <li>Track check-in history</li>
      </ul>

      <p>Our first beta group will be limited.</p>

      <p>Your position on the waitlist helps determine who gets access first.</p>

      <p>Want to improve your chances? Share your referral link:</p>

      <p style="word-break:break-word;">
        <a href="${referralLink}" style="color:#0EA5E9;font-weight:700;">${referralLink}</a>
      </p>

      <p>We’ll announce the first beta invitations soon.</p>

      <p>— LifeSignal</p>
      `
    ),
  }
}

export function buildBetaInviteEmail(betaInviteLink: string) {
  return {
    subject: "You’re invited to the LifeSignal beta",
    html: baseTemplate(
      "You’re invited to the LifeSignal beta",
      `
      <p>Good news — you’ve been selected to join the LifeSignal beta.</p>

      <p>This early version will allow you to:</p>

      <ul>
        <li>Add loved ones who live alone</li>
        <li>Schedule daily check-ins</li>
        <li>Create guardian networks</li>
        <li>Receive safety alerts</li>
      </ul>

      <p>Activate your beta access here:</p>

      <p style="word-break:break-word;">
        <a href="${betaInviteLink}" style="color:#0EA5E9;font-weight:700;">${betaInviteLink}</a>
      </p>

      <p>Thank you for being part of the beginning.</p>

      <p>— The LifeSignal Team</p>
      `
    ),
  }
}

async function sendEmail(to: string, subject: string, html: string) {
  const from = process.env.RESEND_FROM_EMAIL || "LifeSignal <onboarding@resend.dev>"

  return resend.emails.send({
    from,
    to,
    subject,
    html,
  })
}

export async function sendWelcomeEmail(email: string, referralCode: string) {
  const msg = buildWelcomeEmail(referralCode)
  return sendEmail(email, msg.subject, msg.html)
}

export async function sendReferralEmail(email: string, referralCode: string) {
  const msg = buildReferralEmail(referralCode)
  return sendEmail(email, msg.subject, msg.html)
}

export async function sendStoryEmail(email: string) {
  const msg = buildStoryEmail()
  return sendEmail(email, msg.subject, msg.html)
}

export async function sendEarlyAccessEmail(email: string, referralCode: string) {
  const msg = buildEarlyAccessEmail(referralCode)
  return sendEmail(email, msg.subject, msg.html)
}

export async function sendBetaInviteEmail(email: string, betaInviteLink: string) {
  const msg = buildBetaInviteEmail(betaInviteLink)
  return sendEmail(email, msg.subject, msg.html)
}
