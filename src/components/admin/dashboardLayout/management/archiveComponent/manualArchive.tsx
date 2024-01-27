import React, { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../../../../../utils/firebase";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

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

const ManualArchive: React.FC<ContainerProps> = ({ name }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [manuals, setManuals] = useState<Manual[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteAllConfirmation, setDeleteAllConfirmation] =
        useState<boolean>(false);
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<
        string | null
    >(null);
    const [restoreConfirmationId, setRestoreConfirmationId] = useState<
        string | null
    >(null);

    const openImagePreview = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };
    const closeImagePreview = () => {
        setSelectedImage(null);
    };

    const openDeleteConfirmation = (manualId: string) => {
        setDeleteConfirmationId(manualId);
    };
    const closeDeleteConfirmation = () => {
        setDeleteConfirmationId(null);
    };
    const openDeleteAllConfirmation = () => {
        setDeleteAllConfirmation(true);
    };
    const closeDeleteAllConfirmation = () => {
        setDeleteAllConfirmation(false);
    };
    const openRestoreConfirmation = (manualId: string) => {
        setRestoreConfirmationId(manualId);
    };
    const closeRestoreConfirmation = () => {
        setRestoreConfirmationId(null);
    };

    const deleteArchiveManual = async () => {
        if (deleteConfirmationId) {
            try {
                await deleteDoc(doc(db, "manualArchive", deleteConfirmationId));

                const manualsCollection = collection(db, "manualArchive");
                const manualsSnapshot = await getDocs(manualsCollection);
                const manualsData = manualsSnapshot.docs.map((doc) => {
                    const manualData = doc.data() as Manual;
                    return { ...manualData, id: doc.id } as Manual;
                });
                setManuals(manualsData);

                closeDeleteConfirmation();
                console.log("Manual deleted successfully!");
                toast.success("Manual deleted successfully!");
            } catch (error) {
                console.error("Error deleting manual: ", error);
                alert("Error on deleting manual.");
            }
        }
    };

    const deleteAllManual = async () => {
        try {
            const manualsCollection = collection(db, "manualArchive");
            const manualsSnapshot = await getDocs(manualsCollection);

            manualsSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });

            setManuals([]);

            closeDeleteAllConfirmation();
            console.log("All manual deleted successfully!");
            toast.success("All manual deleted successfully!");
        } catch (error) {
            console.error("Error deleting all manual: ", error);
            alert("Error on deleting all manual.");
        }
    };

    const addManual = async (manual: Manual) => {
        try {
            const restoreCollectionRef = collection(db, "manual");

            await addDoc(restoreCollectionRef, manual);

            console.log("Manual restored successfully!");
            toast.info("Manual restored successfully!");
        } catch (error) {
            console.error("Error restoring manual: ", error);
            alert("Error restoring manual.");
        }
    };

    const restoreArchiveManual = async () => {
        if (restoreConfirmationId) {
            try {
                const manualToDelete = manuals.find(
                    (manual) => manual.id === restoreConfirmationId
                );

                if (manualToDelete) {
                    await addManual(manualToDelete);
                }

                await deleteDoc(doc(db, "manualArchive", restoreConfirmationId));

                const manualsCollection = collection(db, "manualArchive");
                const manualsSnapshot = await getDocs(manualsCollection);
                const manualsData = manualsSnapshot.docs.map((doc) => {
                    const manualData = doc.data() as Manual;
                    return { ...manualData, id: doc.id } as Manual;
                });
                setManuals(manualsData);

                closeRestoreConfirmation();
                console.log("Manual restored successfully!");
                toast.success("Manual restored successfully!");
            } catch (error) {
                console.error("Error on restoring manual: ", error);
                alert("Error on restoring manual.");
            }
        }
    };

    // MANUAL
    useEffect(() => {
        const fetchManual = async () => {
            try {
                const manualsCollection = collection(db, "manualArchive");
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

        fetchManual();
    }, []);

    return (
        <>
            <div className="flex items-center space-x-2 justify-between">
                <h1 className="font-bold text-4xl">Archived Manuals</h1>
                <button className="btn btn-square  hover:bg-red-500 hover:text-white" onClick={openDeleteAllConfirmation}>
                    <Icon icon="mdi:delete-alert-outline" className="w-10 h-10" />
                </button>
            </div>
            {loading ? (
                <>
                    <div className="space-y-2">
                        <div className="flex space-x-2 items-center justify-evenly">
                            <div className="skeleton h-5 w-20"></div>
                            <div className="skeleton h-5 w-20"></div>
                            <div className="skeleton h-5 w-20"></div>
                            <div className="skeleton h-5 w-20"></div>
                        </div>
                        <hr className="w-full h-2 bg-base-300 rounded-full " />
                        <div className="flex flex-col gap-4 w-full">
                            <div className="skeleton h-20 w-full"></div>
                            <div className="skeleton h-20 w-full"></div>
                            <div className="skeleton h-20 w-full"></div>
                            <div className="skeleton h-20 w-full"></div>
                            <div className="skeleton h-20 w-full"></div>
                            <div className="skeleton h-20 w-full"></div>
                            <div className="skeleton h-20 w-full"></div>

                        </div>
                    </div>
                </>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Manual Name</th>
                                <th>Manual Description</th>
                                <th>Manual Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {manuals.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan={4}>
                                        <div role="alert" className="alert">
                                            <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                                            <span>No Manuals found.</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {manuals.map((manual, index) => (
                                    <tr key={index}>
                                        <th>{manual.name}</th>
                                        <td>{manual.manualDesc}</td>
                                        <td>
                                            <img
                                                src={manual.imageUrl}
                                                alt="Manual Alt"
                                                style={{
                                                    maxWidth: "100px",
                                                    cursor: "pointer",
                                                }}
                                                className="max-h-20 rounded-2xl max-w-28 cursor-pointer hover:scale-110"
                                                onClick={() => openImagePreview(manual.imageUrl)}
                                            />
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    className="btn btn-square hover:bg-orange-500 hover:text-white"
                                                    onClick={() => openRestoreConfirmation(manual.id)}
                                                >
                                                    <Icon icon="ic:round-restore" className="w-10 h-10" />
                                                </button>
                                                <button
                                                    className="btn btn-square hover:bg-red-500 hover:text-white"
                                                    onClick={() => openDeleteConfirmation(manual.id)}
                                                >
                                                    <Icon icon="mdi:delete-empty-outline" className="w-10 h-10" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            )}

            {/* Image Preview Modal */}
            <Modal
                className="w-screen h-screen flex justify-center items-center"
                isOpen={selectedImage !== null} onRequestClose={closeImagePreview}>
                <div className="flex space-x-2" >
                    <img
                        src={selectedImage || ""}
                        alt="Image Preview"
                        style={{ maxWidth: "100%" }}
                        className="rounded-2xl w-auto h-96"
                    />
                    <button onClick={closeImagePreview} className="btn btn-square">
                        <Icon icon="heroicons:x-mark-16-solid" className="w-10 h-10" />
                    </button>
                </div>
            </Modal>
            {/* Delete Confirmation Modal */}
            <Modal
                className="w-screen h-screen flex justify-center items-center"
                isOpen={deleteConfirmationId !== null}
                onRequestClose={closeDeleteConfirmation}
                ariaHideApp={false}
            >
                <div className="bg-base-100 rounded-2xl h-56 w-96 shadow-xl p-6">
                    <p className="text-3xl text-center">Are you sure you want to delete this manual?</p>
                    <div className="mt-14 space-x-3 flex justify-center">
                        <button onClick={deleteArchiveManual} className="btn btn-primary hover:bg-red-500 text-white">
                            Yes, Delete Forever
                        </button>
                        <button onClick={closeDeleteConfirmation} className="btn bg-base-300">
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Delete All Manual Modal */}
            <Modal
                className="w-screen h-screen flex justify-center items-center"
                isOpen={deleteAllConfirmation}
                onRequestClose={closeDeleteAllConfirmation}
                ariaHideApp={false}
            >
                <div className="bg-base-100 rounded-2xl h-56 w-96 shadow-xl p-6">
                    <p className="text-3xl text-center">Are you sure you want to delete all manual?</p>
                    <div className="mt-14 space-x-3 flex justify-center">
                        <button onClick={deleteAllManual} className="btn btn-primary hover:bg-red-500 text-white">
                            Yes, Delete All Forever
                        </button>
                        <button
                            onClick={closeDeleteAllConfirmation}
                            className="btn bg-base-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Restore Confirmation Modal */}
            <Modal
                className="w-screen h-screen flex justify-center items-center"
                isOpen={restoreConfirmationId !== null}
                onRequestClose={closeRestoreConfirmation}
                ariaHideApp={false}
            >
                <div className="bg-base-100 rounded-2xl h-56 w-96 shadow-xl p-6">
                    <p className="text-3xl text-center">Are you sure you want to restore this manual?</p>
                    <div className="mt-14 space-x-3 flex justify-center">
                        <button onClick={restoreArchiveManual} className="btn bg-warning hover:bg-orange-500 text-white">
                            Yes, Restore
                        </button>
                        <button onClick={closeRestoreConfirmation} className="btn bg-base-300">
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ManualArchive;