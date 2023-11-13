import React, { useState, useEffect, useCallback } from 'react';
import './keyboard.css';

interface KeyboardProps {
  onInput: (value: string) => void;
  onClose: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onInput, onClose }) => {
  const [value, setValue] = useState<string>("");
  const [capsLock, setCapsLock] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onInput(value + '\n');
      } else if (event.key === 'Backspace') {
        setValue((prevValue) => prevValue.slice(0, -1));
      } else if (event.getModifierState('CapsLock')) {
        setCapsLock((prevCapsLock) => !prevCapsLock);
      } else if (event.key === ' ') {
        setValue((prevValue) => prevValue + ' ');
      } else if (event.key === 'Escape') {
        onClose();
      } else if (event.key.length === 1) {
        setValue((prevValue) => prevValue + (capsLock ? event.key.toUpperCase() : event.key.toLowerCase()));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [capsLock, onClose, onInput, value]);

  const toggleCapsLock = useCallback(() => {
    setCapsLock((prevCapsLock) => !prevCapsLock);
  }, [setCapsLock]);

  const createIconHTML = (iconName: string) => {
    return <i className="material-icons">{iconName}</i>;
  };

  const handleKeyClick = (key: string) => {
    switch (key) {
      case 'backspace':
        setValue((prevValue) => prevValue.slice(0, -1));
        break;

      case 'caps':
        toggleCapsLock();
        break;

      case 'enter':
        onInput(value + '\n');
        break;

      case 'space':
        setValue((prevValue) => prevValue + ' ');
        break;

      case 'done':
        onClose();
        break;

      default:
        setValue((prevValue) => prevValue + (capsLock ? key.toUpperCase() : key.toLowerCase()));
        break;
    }
  };

  const renderKeys = () => {
    const keyLayout = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'space',
    ];

    return keyLayout.map((key, index) => {
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      return (
        <React.Fragment key={index}>
          <button
            type="button"
            className={`keyboard__key ${key === 'caps' && capsLock ? 'keyboard__key--active' : ''}`}
            onClick={() => handleKeyClick(key)}
          >
            {key === 'backspace' ? createIconHTML('backspace') : key === 'caps' ? createIconHTML('keyboard_capslock') : key === 'enter' ? createIconHTML('keyboard_return') : key === 'space' ? createIconHTML('space_bar') : key === 'done' ? createIconHTML('check_circle') : key}
          </button>
          {insertLineBreak && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="keyboard">
      <div className="keyboard__keys">{renderKeys()}</div>
    </div>
  );
};

export default Keyboard;