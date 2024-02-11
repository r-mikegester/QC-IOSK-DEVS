// import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import manualImg from "../../../assets/imgs/kiosk.png";
import { Icon } from "@iconify/react";
// import manual from '../../../data/manualData.ts';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface ContainerProps {
    name: string;
}

interface Manual {
    id: string;
    name: string;
    manualDesc: string;
    imageUrl: string;
}

const KioskManual: React.FC<ContainerProps> = ({ name }) => {
    const [manuals, setManuals] = useState<Manual[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedManual, setSelectedManual] = useState<Manual | null>(null);
    const { t } = useTranslation();

    const openModal = (manual: Manual) => {
        setSelectedManual(manual);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedManual(null);
        setIsModalOpen(false);
    };

    const handleViewDemoClick = () => {
        const indexModal = document.getElementById("demoModal");
        if (
            indexModal instanceof HTMLDialogElement &&
            typeof indexModal.showModal === "function"
        ) {
            indexModal.showModal();
        }
    };

    useEffect(() => {
        const fetchManuals = async () => {
            try {
                const manualsCollection = collection(db, "manual");
                const queryManual = query(
                    manualsCollection,
                    orderBy("createdAt", "desc")
                );
                const manualsSnapshot = await getDocs(queryManual);
                const manualsData = manualsSnapshot.docs.map((doc) => {
                    const manualData = doc.data() as Manual;
                    return { ...manualData, id: doc.id } as Manual;
                });
                setManuals(manualsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching manual: ", error);
                setLoading(false);
            }
        };

        fetchManuals();
    }, []);

    return (
        <>
            <div className="h-screen py-10 mb-20 space-y-2 bg-base-100">
                <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
                    <h1 className="text-4xl font-bold text-left ">{t("KioskManual")}</h1>
                    <p className="text-sm 0">Guides for using Gestures on QCIOSK</p>
                </div>
                {loading ? (
                    <>
                        <div className="px-3 pr-6  w-96 h-96 rounded-2xl">
                            <div className="flex flex-col gap-4">
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                                <div className="w-full h-16 skeleton rounded-2xl"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        {manuals.length === 0 ? (
                            <div className="px-3 space-y-2">
                                <div role="alert" className="flex justify-center h-16 shadow-inner alert rounded-2xl" >
                                <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                                    <span className="text-xl">No manual found.</span>
                                </div>
                            </div>
                        ) : (
                            <div className="px-3 space-y-2">
                                {manuals.map((manual, index) => (
                                    <div key={index}>
                                        <div
                                            onClick={() => openModal(manual)}
                                            className="flex items-center justify-between h-full p-3 px-6 shadow-md btn-block btn bg-base-300 rounded-2xl"
                                        >
                                            <div className="text-lg">{manual.name}</div>
                                            <div className="" onClick={() => openModal(manual)}>
                                                <Icon
                                                    icon="lets-icons:view"
                                                    className="w-10 h-10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal for Manual Details */}
            <div className="">
                <Modal
                    className="flex items-center justify-center w-screen h-screen  bg-black/60"
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Announcement Details"
                    ariaHideApp={false}
                >
                    {selectedManual && (
                        <div className="items-center justify-center w-auto p-6 duration-150 ease-in-out shadow-inner  bg-base-100 rounded-3xl h-8/12">
                            <div className="flex space-x-4">
                                <div>
                                     <img
                                            src={selectedManual.imageUrl}
                                            alt="Manual Alt"
                                            className="w-auto h-96 rounded-2xl"
                                        // style={{ maxWidth: "100px" }}
                                        />

                                </div>
                                <div className="relative p-6 shadow-inner bg-base-200 rounded-2xl w-96">
                                    <h1 className="text-4xl font-semibold capitalize">
                                        {selectedManual.name}
                                    </h1>
                                    <p>{selectedManual.manualDesc}</p>
                                    <figure className="rounded-3xl">
                                       
                                    </figure>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-12 shadow-inner btn bg-base-200 btn-square "
                                >
                                    <Icon icon="line-md:close-small" className="w-10 h-10" />
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default KioskManual;
