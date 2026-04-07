"use client";

type ComplianceCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
};

export default function ComplianceCheckbox({
  checked,
  onChange,
  id = "messaging-consent",
}: ComplianceCheckboxProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300"
          required
        />
        <span className="text-sm leading-6 text-slate-700">
          I agree to receive transactional SMS and/or voice safety check-ins, reminders,
          and caregiver notifications from LifeSignal. Message frequency varies. Msg &amp;
          data rates may apply. Reply STOP to opt out and HELP for help. View our{" "}
          <a className="font-medium underline" href="/consent">Consent Policy</a>,{" "}
          <a className="font-medium underline" href="/privacy">Privacy Policy</a>, and{" "}
          <a className="font-medium underline" href="/terms">Terms</a>.
        </span>
      </label>
    </div>
  );
}



