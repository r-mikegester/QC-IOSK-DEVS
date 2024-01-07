import { Icon } from "@iconify/react";
import React, { Component, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import { useTranslation } from "react-i18next";
import "../../assets/css/dock.css";
interface ContainerProps {
  name: string;
}

const onScreenKeyboard: React.FC<ContainerProps> = ({ name }) => {
  const [layoutName, setLayoutName] = React.useState<string>("default");
  const [input, setInput] = React.useState<string>("");
  const keyboardRef = React.useRef<typeof Keyboard | null>(null);

  const history = useHistory();

  const onChange = (newInput: string) => {
    setInput(newInput);
    console.log("Input changed", newInput);
  };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") {
      handleShift();
    }
  };

  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  // const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   const newInput = event.target.value;
  //   setInput(newInput);
  //   if (keyboardRef.current) {
  //     keyboardRef.current.setInput(newInput);
  //   }
  // };
  
  const ClickWelcome = () => {
    // Redirect to the "/Home" route
    history.push("/Home");
  };
  const ClickMap = () => {
    // Redirect to the "/Map" route
    history.push("/Campuses");
  };
  const ClickSearch = () => {
    // Redirect to the "/Search" route
    history.push("/Search");
  };

  const { t } = useTranslation();
  return (
    
    <div className="fixed inset-x-0 items-center justify-center hidden w-5/12 p-5 mx-auto bg-gray-100 xl:block bottom-44 rounded-2xl mt-36">
                  <div className="">
                    <Keyboard name={'Keyboard'}
                      keyboardRef={(r: typeof Keyboard | null) => (keyboardRef.current = r)}
                      layoutName={layoutName}
                      theme={"hg-theme-default hg-layout-default myTheme"}
                      onChange={onChange}
                      onKeyPress={onKeyPress}
                      layout={{
                        default: [
                          // Add the layout you provided here
                          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                          "{tab} q w e r t y u i o p [ ] \\",
                          "{lock} a s d f g h j k l ; ' {enter}",
                          "{shift} z x c v b n m , . / {shift}",
                          "@ {space} .com"
                        ],
                        shift: [
                          // Add the shifted layout here
                          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                          "{tab} Q W E R T Y U I O P { } |",
                          '{lock} A S D F G H J K L : " {enter}',
                          "{shift} Z X C V B N M < > ? {shift}",
                          "@ {space} .com"
                        ]
                      }}
                      buttonTheme={[
                        {
                          class: "hg-red",
                          buttons: ""
                        },
                        {
                          class: "hg-highlight",
                          buttons: "Q q C c U u"
                        }
                      ]}

                    />
                  </div>
                </div>
  );
};

export default onScreenKeyboard;
