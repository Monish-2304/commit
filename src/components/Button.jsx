/**
 * Button Component
 * 
 * This is a reusable Button component designed for flexibility and easy integration.
 * 
 * Usage:
 * 
 * <Button
 *   text="Click Me"        // Required: The text to display on the button
 *   color="bg-red-500"     // Optional: Tailwind CSS class for background color. Default is 'bg-blue-500'
 *   textSize="text-lg"     // Optional: Tailwind CSS class for text size. Default is 'text-base'
 *   width="w-full"         // Optional: Tailwind CSS class for width. Default is 'w-auto'
 *   onClick={handleClick}  // Optional: Function to call on button click. Default is an empty function
 * />
 * 
 * 
 * Props:
 * - `text` (string): **Required** - The text to be displayed on the button.
 * - `color` (string): Optional - The background color of the button. Default is 'bg-blue-500'.
 * - `textSize` (string): Optional - The size of the text. Default is 'text-base'.
 * - `width` (string): Optional - The width of the button. Default is 'w-auto'.
 * - `onClick` (function): Optional - The function to execute when the button is clicked. Default is an empty function.
 */

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, color, textSize,width, onClick }) => {
  const buttonClasses = `py-2 rounded-xl px-2 rounded text-[#7C6D76] cursor-pointer transition-opacity duration-300 ${color} ${textSize} ${width? width:'w-auto'}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  textSize: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: 'bg-blue-500',
  textSize: 'text-base',
  width:'',
  onClick: () => {},
};

export default Button;
