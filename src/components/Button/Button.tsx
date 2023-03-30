import React from 'react';
import './Button.css';


interface IButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info';
    onPress?: () => void;
}
const Button = (props : IButtonProps) => {

  return <button className={(props.className || "") + ' button button-'+(props.type || 'primary') } onClick={props.onPress}>
    {props.children}
  </button>;
}

export default Button;
