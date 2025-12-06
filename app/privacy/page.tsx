// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LifeSignal Privacy Policy",
  description:
    "Privacy Policy for LifeSignal, explaining how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold text-sky-700 mb-2">
          LifeSignal Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Last updated: {year}
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5 text-sm text-slate-800">
          <p>
            This Privacy Policy explains how LifeSignal (&quot;LifeSignal,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
            and protects information when you use our services, including our
            website, applications, SMS messages, and phone calls (collectively,
            the &quot;Service&quot;).
          </p>

          <section>
            <h2 className="text-lg font-semibold mb-1">1. Information We Collect</h2>
            <p className="mb-1">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Contact Information:</strong> Name, phone number, email
                address, and mailing address.
              </li>
              <li>
                <strong>Account Information:</strong> Login credentials, time
                zone, notification preferences, and check-in schedules.
              </li>
              <li>
                <strong>Emergency Contacts:</strong> Names and contact details
                of caregivers or trusted contacts you designate.
              </li>
              <li>
                <strong>Message &amp; Call Data:</strong> SMS content, delivery
                status, timestamps, and call logs related to check-ins and
                alerts.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, device information, and usage data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">2. How We Use Your Information</h2>
            <p className="mb-1">We use information to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide and operate the LifeSignal Service;</li>
              <li>
                Send automated SMS messages and calls for daily check-ins and
                alerts;
              </li>
              <li>
                Notify designated contacts when check-ins are missed or when
                alerts are triggered;
              </li>
              <li>
                Maintain service security, monitor performance, and prevent
                abuse;
              </li>
              <li>
                Communicate with you about your account, updates, and service
                changes;
              </li>
              <li>
                Comply with legal obligations and enforce our Terms of Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">
              3. SMS &amp; Voice Data and Third-Party Providers
            </h2>
            <p>
              We use third-party communications providers, such as Twilio, to
              send SMS messages and phone calls. These providers process your
              phone number, message content, and related technical information
              as needed to deliver the Service. We do not sell your phone
              number or message content to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">4. Legal Bases (If Applicable)</h2>
            <p>
              Where required by law, we rely on your consent, performance of a
              contract, compliance with legal obligations, and our legitimate
              interests (such as providing a reliable and secure safety service)
              as legal bases for processing your information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">5. How We Share Information</h2>
            <p className="mb-1">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Service Providers:</strong> Vendors who help us deliver
                the Service (e.g., communications, hosting, payment processing).
              </li>
              <li>
                <strong>Emergency Contacts:</strong> People you designate to
                receive alerts or notifications.
              </li>
              <li>
                <strong>Legal &amp; Safety:</strong> When required by law or to
                protect our rights, safety, or property, or that of others.
              </li>
            </ul>
            <p className="mt-2">
              We do not sell personal information to third parties for their own
              independent marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">6. Data Retention</h2>
            <p>
              We retain information for as long as necessary to provide the
              Service, comply with legal obligations, resolve disputes, and
              enforce our agreements. We may anonymize or aggregate data so
              that it can no longer be associated with an individual, and use
              that data for analytics and improvement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">7. Your Choices</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You may update or correct your account information in your
                LifeSignal account settings.
              </li>
              <li>
                You may opt out of SMS by replying <strong>STOP</strong> to any
                LifeSignal message.
              </li>
              <li>
                You may contact us to request access, correction, or deletion of
                certain information, subject to legal limitations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">8. Security</h2>
            <p>
              We use reasonable technical and organizational measures to help
              protect your information. However, no system can be completely
              secure, and we cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">9. Children&apos;s Privacy</h2>
            <p>
              LifeSignal is not directed to children under the age of 13. We do
              not knowingly collect personal information from children under
              13. If you believe we have collected such information, please
              contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &quot;Last updated&quot; date at the top of
              this page. Your continued use of LifeSignal after any changes
              means you accept the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle
              your information, please contact us using the support information
              provided inside your LifeSignal account.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
