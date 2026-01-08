export function SiteFooter() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} LifeSignal. All rights reserved.</p>
        <p className="mt-1">A daily wellness check-in service for independent living.</p>
      </div>
    </footer>
  );
}
