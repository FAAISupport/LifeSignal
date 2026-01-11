export default function RefundsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Refund Policy</h1>

      <h2
        id="refund-policy"
        className="text-2xl font-semibold mt-8 mb-4"
      >
        Refund Policy
      </h2>

      <p className="mb-4 text-neutral-700">
        LifeSignal subscriptions and payments are processed by our payment
        provider, <strong>Paddle</strong>, who acts as the
        <strong> Merchant of Record</strong>.
      </p>

      <p className="mb-4 text-neutral-700">
        In accordance with Paddle’s Buyer Terms and applicable consumer
        protection laws, customers have the right to cancel their purchase and
        request a refund within <strong>14 days</strong> of the initial
        transaction, without providing any reason.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Eligibility for Refunds
      </h2>
      <p className="mb-4 text-neutral-700">
        You are eligible for a refund if:
      </p>

      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>The request is made within 14 days of purchase, and</li>
        <li>The request complies with Paddle’s Buyer Terms.</li>
      </ul>

      <p className="mb-4 text-neutral-700">
        After the 14-day cooling-off period, refunds are not guaranteed and are
        assessed in accordance with Paddle’s policies and applicable law.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How Refunds Are Processed
      </h2>
      <p className="mb-4 text-neutral-700">
        All refunds are processed by Paddle and returned to the original payment
        method used at checkout.
      </p>

      <p className="mb-4 text-neutral-700">
        Refund requests may be submitted via:
      </p>

      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>The refund or cancellation link in your Paddle receipt email</li>
        <li>Paddle’s buyer support channels</li>
        <li>LifeSignal support, who can assist with routing your request</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Subscription Cancellations
      </h2>
      <p className="mb-4 text-neutral-700">
        You may cancel your subscription at any time.
      </p>

      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>Cancellations within 14 days are eligible for a refund.</li>
        <li>
          Cancellations after 14 days stop future billing but typically do not
          result in a refund for the current billing period.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Relationship to Terms
      </h2>
      <p className="mb-4 text-neutral-700">
        This Refund Policy forms part of our Terms of Service and should be read
        in conjunction with them.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
      <p className="text-neutral-700">
        Questions regarding refunds may be sent to:
        <br />
        <strong>support@lifesignal.app</strong>
      </p>
    </main>
  );
}
