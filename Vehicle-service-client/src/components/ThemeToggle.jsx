import React from 'react';
import { useTheme } from '../hooks/useTheme';
const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center cursor-pointer justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {/* Sun (shown in light) */}
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${isDark ? 'hidden' : 'block'}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 4a1 1 0 011-1h0a1 1 0 010 2h0a1 1 0 01-1-1zm0 15a1 1 0 011 1h0a1 1 0 01-2 0h0a1 1 0 011-1zm8-7a1 1 0 011 1h0a1 1 0 01-2 0h0a1 1 0 011-1zM5 12a1 1 0 011 1h0a1 1 0 01-2 0h0a1 1 0 011-1zm11.657-5.657a1 1 0 011.414 1.414h0a1 1 0 01-1.414-1.414zM6.929 17.071a1 1 0 011.414 1.414h0a1 1 0 01-1.414-1.414zM17.071 17.071a1 1 0 011.414 1.414h0a1 1 0 01-1.414-1.414zM6.929 6.343a1 1 0 011.414-1.414h0A1 1 0 016.93 6.343zM12 7.5A4.5 4.5 0 1016.5 12 4.505 4.505 0 0012 7.5z" />
      </svg>

      {/* Moon (shown in dark) */}
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${isDark ? 'block' : 'hidden'}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
      </svg>
      <span className="sr-only">{isDark ? 'Dark' : 'Light'} mode</span>
    </button>
  );
};

export default ThemeToggle;