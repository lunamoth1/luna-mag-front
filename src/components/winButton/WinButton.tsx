import { JSX } from 'react';
import styles from './winButton.module.css';

interface WinButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function WinButton({ label = "Пуск", onClick, className = "" }: WinButtonProps): JSX.Element {
  return (
    <button className={`${styles.winButton} ${className}`} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
}
