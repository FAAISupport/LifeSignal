// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>© {year} LifeSignal. All rights reserved.</p>
        <p>Operated by Field Agent AI, LLC • Not a medical or emergency response service.</p>
      </div>
    </footer>
  );
}
