/**
 * Modal Component - Reusable modal wrapper
 * 
 * Provides a centered overlay with backdrop
 */
function Modal({ children, isOpen = true }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal content */}
      <div className="relative z-10 animate-pop-in">
        {children}
      </div>
    </div>
  )
}

export default Modal
