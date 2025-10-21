/// ./src/components/button.jsx

/*
=== UX/UI description ===

### It presents
- black border
- bold text
- {child}

### Its Effect
- Hover: transition scale
- OnClick: transition scale (or second-border)

### Its Logic
- {child} is <div />, because it can contain text or text with icon
- Onlick={call a function}
- type = 'white' -> white background & black text
- type = 'black' -> black background & white text
*/

export function Button({ children, onClick, type = 'white', className = '' }) {
  const baseStyles = 'button-base';
  const typeStyles = type === 'black' ? 'button-black' : 'button-white';

  return (
    <button
      className={`${baseStyles} ${typeStyles} ${className}`}
      onClick={onClick}
    >
      <div className="button-content">
        {children}
      </div>
    </button>
  );
}

export default Button;