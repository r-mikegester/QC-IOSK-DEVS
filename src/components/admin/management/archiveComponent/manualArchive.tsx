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
import { db } from "../../../../utils/firebase";
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
            <div className="flex items-center justify-between space-x-2">
                <h1 className="text-4xl font-bold">Archived Manuals</h1>
                <button className="btn btn-square hover:bg-red-500 hover:text-white" onClick={openDeleteAllConfirmation}>
                    <Icon icon="mdi:delete-alert-outline" className="w-10 h-10" />
                </button>
            </div>
            {loading ? (
                <>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 justify-evenly">
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                        </div>
                        <hr className="w-full h-2 rounded-full bg-base-300 " />
                        <div className="flex flex-col w-full gap-4">
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>

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
                                                className="cursor-pointer max-h-20 rounded-2xl max-w-28 hover:scale-110"
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
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={selectedImage !== null} onRequestClose={closeImagePreview}>
                <div className="flex space-x-2" >
                    <img
                        src={selectedImage || ""}
                        alt="Image Preview"
                        style={{ maxWidth: "100%" }}
                        className="w-auto rounded-2xl h-96"
                    />
                    <button onClick={closeImagePreview} className="btn btn-square">
                        <Icon icon="heroicons:x-mark-16-solid" className="w-10 h-10" />
                    </button>
                </div>
            </Modal>
            {/* Delete Confirmation Modal */}
            <Modal
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={deleteConfirmationId !== null}
                onRequestClose={closeDeleteConfirmation}
                ariaHideApp={false}
            >
                <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
                    <p className="text-3xl text-center">Are you sure you want to delete this manual?</p>
                    <div className="flex justify-center space-x-3 mt-14">
                        <button onClick={deleteArchiveManual} className="text-white btn btn-primary hover:bg-red-500">
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
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={deleteAllConfirmation}
                onRequestClose={closeDeleteAllConfirmation}
                ariaHideApp={false}
            >
                <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
                    <p className="text-3xl text-center">Are you sure you want to delete all manual?</p>
                    <div className="flex justify-center space-x-3 mt-14">
                        <button onClick={deleteAllManual} className="text-white btn btn-primary hover:bg-red-500">
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
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={restoreConfirmationId !== null}
                onRequestClose={closeRestoreConfirmation}
                ariaHideApp={false}
            >
                <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
                    <p className="text-3xl text-center">Are you sure you want to restore this manual?</p>
                    <div className="flex justify-center space-x-3 mt-14">
                        <button onClick={restoreArchiveManual} className="text-white btn bg-warning hover:bg-orange-500">
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