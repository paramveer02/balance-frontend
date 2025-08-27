/**
 * A React component to visually document the application's
 * typography and color palette, as defined in the global CSS file.
 *
 * This component showcases the styling, allowing for easy reference
 * and validation of the design system.
 */
const StyleGuide = () => {
  return (
    // Main container with a darker background and responsive padding.
    <div className="p-8 md:p-12 lg:p-16 bg-gray-100 min-h-screen text-gray-900">
      {/* Page Title with improved contrast */}
      <h1 className="text-4xl font-bold mb-12">Design Style Guide</h1>

      {/* --- Color Palette Section --- */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Color Swatch */}
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-lg shadow-md"
              style={{ backgroundColor: "var(--primary-color)" }}
            ></div>
            <div>
              <p className="text-xl font-medium">Primary Color</p>
              <p className="text-gray-700">
                <span className="font-mono">#009B7A</span>
              </p>
            </div>
          </div>
          {/* Secondary Color Swatch */}
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-lg shadow-md"
              style={{ backgroundColor: "var(--secondary-color)" }}
            ></div>
            <div>
              <p className="text-xl font-medium">Secondary Color</p>
              <p className="text-gray-700">
                <span className="font-mono">#584FFB</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Typography Section --- */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Typography</h2>

        {/* Headings */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Headings</h3>
          <div className="space-y-4">
            <h1>Heading 1 (h1)</h1>
            <h2>Heading 2 (h2)</h2>
            <h3>Heading 3 (h3)</h3>
            <h4>Heading 4 (h4)</h4>
            <h5>Heading 5 (h5)</h5>
            <h6>Heading 6 (h6)</h6>
          </div>
        </div>

        {/* Text Body */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Text Body</h3>
          <div className="space-y-4">
            <div className="text-xl">
              <p className="font-bold">Text XL (20px)</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-lg">
              <p className="font-bold">Text LG (18px)</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-md">
              <p className="font-bold">Text MD (16px)</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-sm">
              <p className="font-bold">Text SM (14px)</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-xs">
              <p className="font-bold">Text XS (12px)</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-xxs">
              <p className="font-bold">Text XXS (10px)</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleGuide;
