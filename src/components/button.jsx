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

import styles from './button.module.css';

export function Button({ children, onClick, type = 'white', className = '' }) {
  const typeStyles = type === 'black' ? styles.buttonBlack : styles.buttonWhite;

  return (
    <button
      className={`${styles.buttonBase} ${typeStyles} ${className}`}
      onClick={onClick}
    >
      <div className={styles.buttonContent}>
        {children}
      </div>
    </button>
  );
}

export default Button;