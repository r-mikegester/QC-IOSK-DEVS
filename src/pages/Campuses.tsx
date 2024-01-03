import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../assets/css/Campuses.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SanBartolome from '../components/campus/SanBartolome';
import SanFransisco from '../components/campus/SanFransisco';
import { Icon } from '@iconify/react';
import Dock from "../components/controls/navigationControls/dock";
interface ContainerProps {
  name: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any; // Add this declaration for ion-icon
    }
  }
}

const SelectCampus: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [slider, setSlider] = useState<HTMLUListElement | null>(null);

  const activate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    action: "next" | "prev"
  ) => {
    if (!slider) {
      return;
    }

    const items = document.querySelectorAll(".item");
    if (action === "next") {
      slider.append(items[0]);
    } else if (action === "prev") {
      slider.prepend(items[items.length - 1]);
    }
  };

  const ClickSB = () => {
    // Redirect to the "/Map" route
    history.push("/SanBartolome");
  };
  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        <main>
          <ul className="slider" ref={(ref) => setSlider(ref)}>
            {/* BATASAN */}
            <li
              className="item "
              style={{
                backgroundImage:
                  "url('/src/assets/Campuses/Batasan.webp')",
              }}
            >
              <div className="content">
                <h2 className="title">QCU - BATASAN</h2>
                <p className="description">
                  Batasan Rd, Quezon City, Metro Manila
                </p>
                <p className="description">
                  OFFICE HOURS <br />
                  Monday – Friday <br />
                  8:00 am – 5:00 pm
                </p>
                <a onClick={ClickSB}>
                  <button>Click to Navigate</button>
                </a>
              </div>
            </li>

            {/* SAN BARTOLOME */}
            <li
              className="item "
              style={{
                backgroundImage: `url('/src/assets/Campuses/SanBartolome.webp')`,
              }}
            >
              <div className="content">
                <h2 className="title">QCU - SAN BARTOLOME</h2>
                <p className="description">
                  673 Quirino Highway, San Bartolome Novaliches, Quezon City,
                  Metro Manila
                </p>
                <p className="description">
                  OFFICE HOURS <br />
                  Monday – Friday <br />
                  8:00 am – 5:00 pm
                </p>
                <a onClick={ClickSB}>
                  <button>Click to Navigate</button>
                </a>
              </div>
            </li>

            {/* SAN FRANCISCO */}
            <li
              className="item "
              style={{
                backgroundImage: `url('/src/assets/imgs/Campuses/SanFransisco.webp')`,
              }}
            >
              <div className="content">
                <h2 className="title">QCU - SAN FRANCISCO</h2>
                <p className="description">
                  Bago Bantay, Quezon City, Metro Manila
                </p>
                <p className="description">
                  OFFICE HOURS <br />
                  Monday – Friday <br />
                  8:00 am – 5:00 pm
                </p>
                <a onClick={ClickSB}>
                  <button>Click to Navigate</button>
                </a>
              </div>
            </li>

            {/* BATASAN */}
            <li
              className="item "
              style={{
                backgroundImage: `url('/src/assets/Campuses/Batasan.webp')`,
              }}
            >
              <div className="content">
                <h2 className="title">QCU - BATASAN</h2>
                <p className="description">
                  Batasan Rd, Quezon City, Metro Manila
                </p>
                <p className="description">
                  OFFICE HOURS <br />
                  Monday – Friday <br />
                  8:00 am – 5:00 pm
                </p>
                <a onClick={ClickSB}>
                  <button>Click to Navigate</button>
                </a>
              </div>
            </li>

            {/* SAN BARTOLOME */}
            <li
              className="item "
              style={{
                backgroundImage: `url('/src/assets/Campuses/SanBartolome.webp')`,
              }}
            >
              <div className="content">
                <h2 className="title">QCU - SAN BARTOLOME</h2>
                <p className="description">
                  673 Quirino Highway, San Bartolome Novaliches, Quezon City,
                  Metro Manila
                </p>
                <p className="description">
                  OFFICE HOURS <br />
                  Monday – Friday <br />
                  8:00 am – 5:00 pm
                </p>
                <a onClick={ClickSB}>
                  <button>Click to Navigate</button>
                </a>
              </div>
            </li>

            {/* SAN FRANCISCO */}
            <li
              className="item "
              style={{
                backgroundImage: `url('/src/assets/Campuses/SanFransisco.webp')`,
              }}
            >
              <div className="content">
                <h2 className="title">QCU - SAN FRANCISCO</h2>
                <p className="description">
                  Bago Bantay, Quezon City, Metro Manila
                </p>
                <p className="description">
                  OFFICE HOURS <br />
                  Monday – Friday <br />
                  8:00 am – 5:00 pm
                </p>
                <a onClick={ClickSB}>
                  <button>Click to Navigate</button>
                </a>
              </div>
            </li>
          </ul><Dock name={""} />
          <nav className="nav">
            <div className="btn prev" onClick={(e) => activate(e, "prev")}>
            <Icon icon="iconamoon:arrow-left-2" />
            </div>
            <div className="btn next" onClick={(e) => activate(e, "next")}>
            <Icon icon="iconamoon:arrow-right-2" />            </div>
          </nav> 
        </main>
       
      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;