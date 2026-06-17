import { motion } from 'framer-motion';
import { Menu, Wrench, Lock, Loader2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface AppBarProps {
  currentUrl: string;
  isLoading: boolean;
  onOpenRightDrawer: () => void;
  onOpenLeftDrawer: () => void;
}

export default function AppBar({ currentUrl, isLoading, onOpenRightDrawer, onOpenLeftDrawer }: AppBarProps) {
  const { isDark } = useTheme();

  const displayUrl = (() => {
    try {
      const parsed = new URL(currentUrl);
      return parsed.hostname;
    } catch {
      return currentUrl;
    }
  })();

  return (
    <div className={`relative flex items-center h-14 px-3 shrink-0 transition-colors duration-300
      ${isDark
        ? 'bg-brand-dark border-b border-white/5'
        : 'bg-white border-b border-gray-200 shadow-sm'
      }`}
    >
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-l from-brand-red via-brand-blue to-brand-red opacity-60" />

      {/* Left toolbar button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenLeftDrawer}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
          ${isDark
            ? 'text-white/70 hover:text-brand-blue hover:bg-white/5'
            : 'text-gray-500 hover:text-brand-blue hover:bg-gray-100'
          }`}
      >
        <Wrench className="w-5 h-5" />
      </motion.button>

      {/* URL Bar */}
      <div className="flex-1 mx-3">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors duration-300
          ${isDark
            ? 'bg-white/5 border-white/5'
            : 'bg-gray-50 border-gray-200'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 text-brand-blue animate-spin shrink-0" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-green-500 shrink-0" />
          )}
          <span className={`text-xs truncate font-mono ${isDark ? 'text-white/50' : 'text-gray-500'}`} dir="ltr">
            {displayUrl}
          </span>
        </div>
      </div>

      {/* Right menu button (hamburger) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenRightDrawer}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
          ${isDark
            ? 'text-white/70 hover:text-brand-red hover:bg-white/5'
            : 'text-gray-500 hover:text-brand-red hover:bg-gray-100'
          }`}
      >
        <Menu className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
