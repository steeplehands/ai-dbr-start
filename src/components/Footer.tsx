export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RIZO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
