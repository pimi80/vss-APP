import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { SITE_1, SITE_2 } from '../config';
import { useTheme } from '../hooks/useTheme';

interface LeftDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onBack: () => void;
  onForward: () => void;
  onGoHome: (url: string) => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export default function LeftDrawer({
  isOpen,
  onClose,
  onRefresh,
  onBack,
  onForward,
  onGoHome,
  canGoBack,
  canGoForward,
}: LeftDrawerProps) {
  const { isDark } = useTheme();

  const tools = [
    {
      label: 'بازگشت',
      icon: <ArrowRight className="w-6 h-6" />,
      action: onBack,
      disabled: !canGoBack,
    },
    {
      label: 'جلو',
      icon: <ArrowLeft className="w-6 h-6" />,
      action: onForward,
      disabled: !canGoForward,
    },
    {
      label: 'بارگذاری مجدد',
      icon: <RefreshCw className="w-6 h-6" />,
      action: onRefresh,
      disabled: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
            className={`fixed top-0 left-0 bottom-0 w-[280px] max-w-[80vw] z-[70] flex flex-col transition-colors duration-300
              ${isDark
                ? 'bg-brand-dark border-r border-white/10'
                : 'bg-white border-r border-gray-200 shadow-2xl'
              }`}
          >
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold text-sm ${isDark ? 'text-white/80' : 'text-gray-700'}`} dir="rtl">ابزارها</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors
                    ${isDark
                      ? 'glass text-white/70 hover:text-white'
                      : 'bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-700'
                    }`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-brand-blue/30 via-transparent to-brand-red/30" />

            {/* Navigation tools */}
            <div className="p-4 space-y-2" dir="rtl">
              <p className={`text-xs px-3 mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>ناوبری</p>
              {tools.map((tool, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { tool.action(); onClose(); }}
                  disabled={tool.disabled}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-right transition-colors duration-200
                    ${tool.disabled
                      ? isDark ? 'text-white/20 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                      : isDark
                        ? 'text-white hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                    ${tool.disabled
                      ? isDark ? 'bg-white/5' : 'bg-gray-50'
                      : isDark ? 'glass' : 'bg-gray-100 border border-gray-200'
                    }`}>
                    {tool.icon}
                  </div>
                  <span className="text-sm font-medium">{tool.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className={`mx-6 h-px my-2 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />

            {/* Home buttons */}
            <div className="p-4 space-y-2" dir="rtl">
              <p className={`text-xs px-3 mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>صفحات اصلی</p>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { onGoHome(SITE_1.url); onClose(); }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-right transition-colors duration-200 group
                  ${isDark
                    ? 'text-white hover:bg-red-500/10'
                    : 'text-gray-700 hover:bg-red-50'
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center
                  group-hover:bg-brand-red/20 transition-colors">
                  <Home className="w-5 h-5 text-brand-red" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{SITE_1.name}</span>
                  <span className={`text-[10px] ${isDark ? 'text-white/30' : 'text-gray-400'}`} dir="ltr">{SITE_1.domain}</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { onGoHome(SITE_2.url); onClose(); }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-right transition-colors duration-200 group
                  ${isDark
                    ? 'text-white hover:bg-blue-500/10'
                    : 'text-gray-700 hover:bg-blue-50'
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center
                  group-hover:bg-brand-blue/20 transition-colors">
                  <Home className="w-5 h-5 text-brand-blue" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{SITE_2.name}</span>
                  <span className={`text-[10px] ${isDark ? 'text-white/30' : 'text-gray-400'}`} dir="ltr">{SITE_2.domain}</span>
                </div>
              </motion.button>
            </div>

            {/* Footer */}
            <div className={`mt-auto p-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <p className={`text-center text-[10px] ${isDark ? 'text-white/20' : 'text-gray-300'}`}>
                ابزارهای ناوبری <span className="italic font-semibold" dir="ltr"><span className="text-brand-red">v</span><span className="text-brand-blue">ss</span></span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
