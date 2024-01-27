import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import ManualArchive from "./archiveComponent/manualArchive";
import AnnouncementArchive from "./archiveComponent/announcementArchive";
import EventsArchive from "./archiveComponent/eventsArchive";
import { Icon } from "@iconify/react";

interface ContainerProps {
    name: string;
}

const Archive: React.FC<ContainerProps> = ({ name }) => {
    const [selectedTab, setSelectedTab] = useState(1);


    const handleTabChange = (tabNumber: number) => {
        setSelectedTab(tabNumber);
    };


    return (
        <IonPage>
            <IonContent fullscreen>
                <div>
                    <AdminSideBar name={""} />
                    <AdminHeader name={""} />
                    <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
                        <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
                            <h1 className="font-bold text-4xl">Archives</h1>

                            <div role="tablist" className="tabs tabs-lifted tabs-lg">
                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 1 ? "tab bg-base-300" : "tab"
                                    }
                                    aria-label="Rooms"
                                    checked={selectedTab === 1}
                                    onChange={() => handleTabChange(1)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <div role="alert" className="alert">
                                        <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                                        <span>No Rooms data found.</span>
                                    </div>
                                </div>

                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 2 ? "tab bg-base-300" : "tab"
                                    }
                                    aria-label="Buildings"
                                    checked={selectedTab === 2}
                                    onChange={() => handleTabChange(2)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <div role="alert" className="alert">
                                        <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                                        <span>No Building data found.</span>
                                    </div>
                                </div>

                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 3 ? "tab bg-base-300" : "tab"
                                    }
                                    aria-label="Events"
                                    checked={selectedTab === 3}
                                    onChange={() => handleTabChange(3)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <EventsArchive name="" />
                                </div>

                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 4 ? "tab bg-base-300" : "tab"
                                    }
                                    aria-label="Announcements"
                                    checked={selectedTab === 4}
                                    onChange={() => handleTabChange(4)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <AnnouncementArchive name="" />
                                </div>
                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 5 ? "tab bg-base-300" : "tab"
                                    }
                                    aria-label="Manual"
                                    checked={selectedTab === 5}
                                    onChange={() => handleTabChange(5)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <ManualArchive name="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Archive;