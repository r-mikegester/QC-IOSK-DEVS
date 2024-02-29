import React, { FunctionComponent, useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { KeyboardRef } from "../Search";
import { roomData } from "../../data/roomData";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: React.MutableRefObject<KeyboardRef | undefined>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
}) => {
  const [layoutName, setLayoutName] = useState("default");
  const internalKeyboardRef = useRef<any>(null);

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    } else if (button === "{enter}") {
      const inputValue = internalKeyboardRef.current.getInput();
      console.log("Input value:", inputValue);

      // Match input value with room data
      const matchingRooms = Object.values(roomData).flatMap((building) =>
        Object.values(building).flatMap((rooms) =>
          rooms.filter(
            (room) => room.name.toLowerCase() === inputValue.toLowerCase()
          )
        )
      );

      // Log matching rooms
      if (matchingRooms.length > 0) {
        console.log("Matching rooms:", matchingRooms);
      } else {
        console.log("No matching rooms found.");
      }
    }
  };

  keyboardRef.current = internalKeyboardRef.current;

  return (
    <div className="w-full h-full flex justify-center">
      <Keyboard
        keyboardRef={(r) => (internalKeyboardRef.current = r)}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onRender={() => console.log("Rendered")}
      />
    </div>
  );
};

export default KeyboardWrapper;
