#Enhancing Navigation with QC-IOSK: A Projected Capacitive (PCAP) Navigational Kiosk for Quezon City University Campuses

!DOCUMENTS NEEDED FOR DEVELOPMENT! (DEVS ONLY)
IF YOU ENCOUNTER THIS ERROR:

[plugin:vite:import-analysis] Failed to resolve import "../../../../assets/models/others/sb_floor_final_joined.glb" from "src/components/campus/sanBartolome/animation/Animation.tsx". Does the file exist?
/workspaces/QC-IOSK-DEVS/src/components/campus/sanBartolome/animation/Animation.tsx:17:24
25 |  import * as THREE from "three";
26 |  import ModelViewer from "../ModelViewer";
27 |  import openGrounds from "../../../../assets/models/others/sb_floor_final_joined.glb";
   |                           ^
28 |  const AnimatedModelViewer = ({ modelPath, mixer }) => {
29 |    _s();

DOWNLOAD THIS FILE 
sb_final_joined:
https://drive.google.com/file/d/1mf2rE712sh0q9_Y_U_bPwun_UhYWa3vr/view?pli=1

AND PASTE IT ON THIS LOCATION > SRC/ASSETS/MODELS/OTHERS/

THEN REFRESH.
------------------------------------------------------------------------------

FOR ROOMDATA------------------------------------------------------------------
ASSIGNED: FREEBIE, VINAS

ROOM DATA DETAILS NEEDED:

ETA (estimated time of arrival): 
DISTANCE FROM KIOSK TO THE LOCATION (IN METERS EXAMPLE(69m 420m))
Room name:

refer to the roomdata example in kiosk >click belmonte >click 1st floor >click IC103

template for roomData
{
        buildingName: " Building",
        floorNumber: "",
        name: "",
        modelPath: "",
        voice:"",
        details: ["Room Info 1s", "Room Info 2"],
        textGuide: ["Text Guide: lol", "Room Info 2"],
      },
------------------------------------------------------------------------------




FOR TRANSLATION---------------------------------------------------------------
ASSIGNED: ADAMOS

REQUIREMENTS ON TRANSLATION
STEP 1 CHECK IF THE FILE HAS A IMPORT LIKE THIS:
import { useTranslation } from "react-i18next";
IF IT HAS PROCEED TO STEP2

STEP 2 CHECK IF THE FILE HAS A FUNCTION DECLARATION LIKE THIS:
  const { t } = useTranslation();
IF IT HAS, PROCEED TO STEP 3

STEP 3 
THE FORMAT ON TRANSLATING WOULD BE LIKE THIS 
text={t("Home")}  OR <H1>{t("home")}</H1> = example only
main key item is {t("home")} this alone is all you need to translate every text on kiosk

after that you can now proceed to STEP 4

STEP 4 the translations in this locations:
TAGALOG TRANSLATION LOCATION:
QC-IOSK-DEVS/src/components/locales/tagalog_translation.json
ENGLISH TRANSLATION LOCATION:
QC-IOSK-DEVS/src/components/locales/english_translation.json

STEP 5 
THE TRANSLATION IS IN JSON FORMAT SO IT SHOULD WORK AS 

"JACK CALL": "JACK TAWAG", EQUIVALENT TO 
  {t("JACK CALL")} / THIS IS THE TRANSLATION


TIPS:
YOU MUST DO THE STEP 3 ON A WHOLE FILE THEN CODE THEM 
DOWN IN THE translation FILE

testing testing