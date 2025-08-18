export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} LevelUp Life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
