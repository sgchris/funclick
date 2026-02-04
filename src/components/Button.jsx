/**
 * Button Component - Reusable styled button
 * 
 * Supports different variants and sizes
 */
function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-indigo-500 to-purple-600
      hover:from-indigo-400 hover:to-purple-500
      text-white shadow-lg shadow-indigo-500/30
      hover:shadow-indigo-500/50
      focus:ring-indigo-500
    `,
    success: `
      bg-gradient-to-r from-emerald-500 to-teal-600
      hover:from-emerald-400 hover:to-teal-500
      text-white shadow-lg shadow-emerald-500/30
      hover:shadow-emerald-500/50
      focus:ring-emerald-500
    `,
    secondary: `
      bg-slate-700 hover:bg-slate-600
      text-slate-200 border border-slate-600
      focus:ring-slate-500
    `,
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
