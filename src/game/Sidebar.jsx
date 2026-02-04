import { ClockIcon, TrophyIcon, HashtagIcon } from '@heroicons/react/24/solid'
import { useGame } from '../context/GameContext'
import { useTimer } from '../hooks/useTimer'
import TimerSlider from '../components/TimerSlider'

/**
 * Sidebar Component - Displays game stats and timer
 * 
 * Shows:
 * - Current score (highest number clicked)
 * - Current iteration
 * - Countdown timer with visual slider
 */
function Sidebar() {
  const { state } = useGame()
  const { highestClicked, iteration, timeLimit, nextExpectedNumber } = state
  
  // Get timer state
  const { timeRemaining } = useTimer()

  // Format time to one decimal place
  const formattedTime = timeRemaining.toFixed(1)

  // Determine timer color classes
  const timerColorClass = 
    timeRemaining <= 1.0 
      ? 'text-red-400' 
      : timeRemaining <= 1.5 
        ? 'text-amber-400' 
        : 'text-emerald-400'

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-700/50 bg-slate-800/30 p-6 flex flex-col gap-6">
      {/* Score Section */}
      <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
          <TrophyIcon className="w-4 h-4" />
          <span>Score</span>
        </div>
        <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          {highestClicked}
        </div>
      </div>

      {/* Next Number Section */}
      <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
          <HashtagIcon className="w-4 h-4" />
          <span>Click Next</span>
        </div>
        <div className="text-3xl font-bold text-emerald-400">
          {nextExpectedNumber}
        </div>
      </div>

      {/* Iteration Section */}
      <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
          <span className="text-lg">🎯</span>
          <span>Round</span>
        </div>
        <div className="text-2xl font-semibold text-slate-200">
          {iteration}
        </div>
      </div>

      {/* Timer Section */}
      <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
          <ClockIcon className="w-4 h-4" />
          <span>Time Left</span>
        </div>
        
        {/* Timer display */}
        <div className={`text-4xl font-mono font-bold mb-3 ${timerColorClass} ${timeRemaining <= 1.0 ? 'animate-pulse-fast' : ''}`}>
          {formattedTime}s
        </div>
        
        {/* Timer slider */}
        <TimerSlider timeRemaining={timeRemaining} timeLimit={timeLimit} />
      </div>

      {/* Instructions */}
      <div className="mt-auto text-slate-500 text-xs leading-relaxed">
        <p className="mb-2">
          <span className="text-emerald-400 font-medium">Green tiles</span> = click next!
        </p>
        <p>
          Click all tiles before time runs out. Speed increases each round!
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
