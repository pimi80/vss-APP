import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, RefreshCw, Home } from 'lucide-react';
import { SITE_1, SITE_2 } from '../config';
import { useTheme } from '../hooks/useTheme';

interface BottomBarProps {
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  onGoHome1: () => void;
  onGoHome2: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onShare?: () => void;
}

export default function BottomBar({
  onBack,
  onForward,
  onRefresh,
  onGoHome1,
  onGoHome2,
  canGoBack,
  canGoForward,
}: BottomBarProps) {
  const { isDark } = useTheme();

  const buttons = [
    {
      icon: <ArrowRight className="w-5 h-5" />,
      action: onBack,
      disabled: !canGoBack,
      label: 'بازگشت',
    },
    {
      icon: <ArrowLeft className="w-5 h-5" />,
      action: onForward,
      disabled: !canGoForward,
      label: 'جلو',
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      action: onRefresh,
      disabled: false,
      label: 'بارگذاری',
    },
    {
      icon: <Home className="w-5 h-5 text-brand-red" />,
      action: onGoHome1,
      disabled: false,
      label: SITE_1.domain.split('.')[0],
    },
    {
      icon: <Home className="w-5 h-5 text-brand-blue" />,
      action: onGoHome2,
      disabled: false,
      label: SITE_2.domain.split('.')[0],
    },
  ];

  return (
    <div className={`relative h-16 flex items-center justify-around px-2 shrink-0 transition-colors duration-300
      ${isDark
        ? 'bg-brand-dark border-t border-white/5'
        : 'bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'
      }`}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-l from-brand-red/30 via-transparent to-brand-blue/30" />

      {buttons.map((btn, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={btn.action}
          disabled={btn.disabled}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors
            ${btn.disabled
              ? isDark ? 'text-white/15 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
              : isDark
                ? 'text-white/60 hover:text-white hover:bg-white/5 active:bg-white/10'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100 active:bg-gray-200'
            }`}
        >
          {btn.icon}
          <span className="text-[9px]">{btn.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
