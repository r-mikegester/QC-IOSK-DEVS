import React, { useEffect, useState, useMemo } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

Modal.setAppElement("#root");

interface ContainerProps {
  name: string;
}

interface Announcement {
  id: string;
  name: string;
  announcementSource: string;
  announcementDesc: string;
  startDate: string;
  startTime: string;
}

const AnnouncementArchive: React.FC<ContainerProps> = ({ name }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteAllConfirmation, setDeleteAllConfirmation] =
    useState<boolean>(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    string | null
  >(null);
  const [restoreConfirmationId, setRestoreConfirmationId] = useState<
    string | null
  >(null);

  const columns = useMemo<MRT_ColumnDef<Announcement>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => openRestoreConfirmation(row.original.id)}
              className="btn btn-primary"
            >
              Restore
            </button>
            <button
              onClick={() => openDeleteConfirmation(row.original.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ),
      },
      { accessorKey: "name", header: "Announcement Name", size: 150 },
      {
        accessorKey: "announcementSource",
        header: "Source",
        size: 150,
      },
      {
        accessorKey: "announcementDesc",
        header: "Description",
        size: 150,
      },
      { accessorKey: "startDate", header: "Start Date", size: 150 },
      { accessorKey: "startTime", header: "Start Time", size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: announcements,
  });

  const openDeleteConfirmation = (announcementId: string) => {
    setDeleteConfirmationId(announcementId);
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
  const openRestoreConfirmation = (announcementId: string) => {
    setRestoreConfirmationId(announcementId);
  };
  const closeRestoreConfirmation = () => {
    setRestoreConfirmationId(null);
  };

  const deleteArchiveAnnouncement = async () => {
    if (deleteConfirmationId) {
      try {
        await deleteDoc(doc(db, "announcementsArchive", deleteConfirmationId));

        const announcementsCollection = collection(db, "announcementsArchive");
        const announcementsSnapshot = await getDocs(announcementsCollection);
        const announcementsData = announcementsSnapshot.docs.map((doc) => {
          const announcementData = doc.data() as Announcement;
          return { ...announcementData, id: doc.id } as Announcement;
        });
        setAnnouncements(announcementsData);

        closeDeleteConfirmation();
        console.log("Announcement deleted successfully!");
        toast.success("Announcement deleted successfully!");
      } catch (error) {
        console.error("Error deleting announcement: ", error);
        alert("Error on deleting announcement.");
      }
    }
  };

  const deleteAllAnnouncements = async () => {
    try {
      const announcementsCollection = collection(db, "announcementsArchive");
      const announcementssSnapshot = await getDocs(announcementsCollection);

      announcementssSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setAnnouncements([]);

      closeDeleteAllConfirmation();
      console.log("All announcements deleted successfully!");
      toast.success("All announcements deleted successfully!");
    } catch (error) {
      console.error("Error deleting all announcements: ", error);
      alert("Error on deleting all announcements.");
    }
  };

  const addAnnouncement = async (announcement: Announcement) => {
    try {
      const restoreCollectionRef = collection(db, "announcements");

      await addDoc(restoreCollectionRef, announcement);

      console.log("Announcement restored successfully!");
    } catch (error) {
      console.error("Error restoring Announcement: ", error);
      alert("Error restoring Announcement.");
    }
  };

  const restoreArchiveAnnouncement = async () => {
    if (restoreConfirmationId) {
      try {
        const announcementToDelete = announcements.find(
          (announcement) => announcement.id === restoreConfirmationId
        );

        if (announcementToDelete) {
          await addAnnouncement(announcementToDelete);
        }

        await deleteDoc(doc(db, "announcementsArchive", restoreConfirmationId));

        const announcementsCollection = collection(db, "announcementsArchive");
        const announcementsSnapshot = await getDocs(announcementsCollection);
        const announcementsData = announcementsSnapshot.docs.map((doc) => {
          const announcementData = doc.data() as Announcement;
          return { ...announcementData, id: doc.id } as Announcement;
        });
        setAnnouncements(announcementsData);

        closeRestoreConfirmation();
        console.log("Announcement restored successfully!");
        toast.success("Announcement restored successfully!");
      } catch (error) {
        console.error("Error on restoring announcement: ", error);
        alert("Error on restoring announcement.");
      }
    }
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcementsArchive");
        const queryAnnouncement = query(
          announcementsCollection,
          orderBy("createdAt", "desc")
        );
        const announcementsSnapshot = await getDocs(queryAnnouncement);
        const announcementsData = announcementsSnapshot.docs.map((doc) => {
          const announcementData = doc.data() as Announcement;
          return { ...announcementData, id: doc.id } as Announcement;
        });
        setAnnouncements(announcementsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between space-x-2">
        <h1 className="text-4xl font-bold">Archived Announcements</h1>
        <button
          className="btn btn-square hover:bg-red-500 hover:text-white"
          onClick={openDeleteAllConfirmation}
        >
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
        <MaterialReactTable table={table} />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        className="flex items-center justify-center w-screen h-screen bg-black/60"
        isOpen={deleteConfirmationId !== null}
        onRequestClose={closeDeleteConfirmation}
        ariaHideApp={false}
      >
        <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
          <p className="text-3xl text-center">
            Are you sure you want to delete this announcement?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button
              onClick={deleteArchiveAnnouncement}
              className="btn btn-danger"
            >
              Yes, Delete Forever
            </button>
            <button
              onClick={closeDeleteConfirmation}
              className="btn btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Delete All Announcements Modal */}
      <Modal
        className="flex items-center justify-center w-screen h-screen bg-black/60"
        isOpen={deleteAllConfirmation}
        onRequestClose={closeDeleteAllConfirmation}
        ariaHideApp={false}
      >
        <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
          <p className="text-3xl text-center">
            Are you sure you want to delete all announcements?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button onClick={deleteAllAnnouncements} className="btn btn-danger">
              Yes, Delete All Forever
            </button>
            <button
              onClick={closeDeleteAllConfirmation}
              className="btn btn-primary"
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
          <p className="text-3xl text-center">
            Are you sure you want to restore this announcement?
          </p>
          <div className="flex justify-center mt-6 space-x-3">
            <button
              onClick={restoreArchiveAnnouncement}
              className="text-white btn bg-warning hover:bg-orange-500"
            >
              Yes, Restore
            </button>
            <button
              onClick={closeRestoreConfirmation}
              className="btn bg-base-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AnnouncementArchive;
