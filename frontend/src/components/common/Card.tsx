import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'flat' | 'elevated' | 'glass' | 'interactive';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`card card-${variant} ${onClick ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
