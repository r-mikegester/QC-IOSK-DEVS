// declare module "react-simple-keyboard" {
//   export default class Keyboard {
//     setInput: (input: string) => void;
//     // Add other properties or methods you're using from Keyboard component
//   }
// }

// keyboard.d.ts

declare module "react-simple-keyboard" {
  import { RefObject } from "react";

  export interface KeyboardProps {
    keyboardRef: (keyboard: string) => void; // Adjust this type as needed
    layoutName?: string;
    onChange?: (input: string) => void;
    onKeyPress?: (button: string) => void;
    onRender?: () => void;
    // Add other props as needed
  }

  const Keyboard: React.ComponentType<KeyboardProps>;
  export default Keyboard;
}
