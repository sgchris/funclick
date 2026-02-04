import { useMemo } from 'react'

/**
 * TimerSlider Component - Visual countdown progress bar
 * 
 * Displays the remaining time as a shrinking bar with color coding:
 * - Green/Teal: Plenty of time
 * - Amber: Getting low
 * - Red: Critical (< 1 second)
 */
function TimerSlider({ timeRemaining, timeLimit }) {
  // Calculate percentage remaining
  const percentage = useMemo(() => {
    return Math.max(0, Math.min(100, (timeRemaining / timeLimit) * 100))
  }, [timeRemaining, timeLimit])

  // Determine color based on time remaining
  const colorClasses = useMemo(() => {
    if (timeRemaining <= 1.0) {
      return 'from-red-500 to-red-600'
    }
    if (timeRemaining <= 1.5) {
      return 'from-amber-400 to-orange-500'
    }
    return 'from-emerald-400 to-teal-500'
  }, [timeRemaining])

  // Determine if we should pulse (critical time)
  const shouldPulse = timeRemaining <= 1.0 && timeRemaining > 0

  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
        {/* Progress bar fill */}
        <div
          className={`
            h-full rounded-full transition-all duration-100 ease-linear
            bg-gradient-to-r ${colorClasses}
            ${shouldPulse ? 'animate-pulse-fast' : ''}
          `}
          style={{ 
            width: `${percentage}%`,
            boxShadow: shouldPulse ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none'
          }}
        />
      </div>
    </div>
  )
}

export default TimerSlider
