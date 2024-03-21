import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  addDoc,
} from "@firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
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

const ManageAnnouncements: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteAllConfirmation, setDeleteAllConfirmation] =
    useState<boolean>(false);

  const columns = useMemo<MRT_ColumnDef<Announcement>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => updateAnnouncement(row.original.id)}
              className="btn btn-primary"
            >
              Edit
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

  const createAnnouncement = () => {
    history.replace("/createAnnouncement");
  };

  const updateAnnouncement = (announcementId: string) => {
    history.replace(`/updateAnnouncement/${announcementId}`);
  };

  const openDeleteConfirmation = (announcementId: string) => {
    setSelectedAnnouncementId(announcementId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedAnnouncementId(null);
  };

  const openDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(true);
  };

  const closeDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(false);
  };

  const archiveAnnouncement = async (announcement: Announcement) => {
    try {
      const archiveCollectionRef = collection(db, "announcementsArchive");

      await addDoc(archiveCollectionRef, announcement);

      console.log("Announcement archived successfully!");
    } catch (error) {
      console.error("Error archiving announcement: ", error);
      alert("Error archiving announcement.");
    }
  };

  const deleteAnnouncement = async () => {
    if (selectedAnnouncementId) {
      try {
        const announcementToDelete = announcements.find(
          (announcement) => announcement.id === selectedAnnouncementId
        );

        if (announcementToDelete) {
          await archiveAnnouncement(announcementToDelete);
        }

        await deleteDoc(doc(db, "announcements", selectedAnnouncementId));

        const announcementsCollection = collection(db, "announcements");
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
      const announcementsCollection = collection(db, "announcements");
      const announcementsSnapshot = await getDocs(announcementsCollection);

      announcementsSnapshot.forEach(async (doc) => {
        const announcementData = doc.data() as Announcement;
        await archiveAnnouncement({ ...announcementData, id: doc.id });
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

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcements");
        const queryAnnouncement = query(
          announcementsCollection,
          orderBy("createdAt", "desc")
        );
        const announcementsSnapshot = await getDocs(queryAnnouncement);
        const announcementsData = announcementsSnapshot.docs.map((doc) => {
          const announcementsData = doc.data() as Announcement;
          return { ...announcementsData, id: doc.id } as Announcement;
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
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full min-h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Announcement Management</h1>
                <div className="flex items-center mr-5 space-x-3">
                  <button
                    onClick={createAnnouncement}
                    className="btn btn-square hover:bg-emerald-500 hover:text-white"
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                  </button>
                  <button
                    onClick={openDeleteAllConfirmation}
                    className="btn btn-square hover:bg-red-500 hover:text-white"
                  >
                    <Icon
                      icon="mdi:delete-alert-outline"
                      className="w-10 h-10"
                    />
                  </button>
                </div>
              </div>

              <br />
              <br />
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
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedAnnouncementId !== null}
          onRequestClose={closeDeleteConfirmation}
          ariaHideApp={false}
        >
          <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
            <p className="text-3xl text-center">
              Are you sure you want to delete this announcement?
            </p>
            <div className="flex justify-center mt-6 space-x-3">
              <button
                onClick={deleteAnnouncement}
                className="text-white btn btn-primary hover:bg-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteConfirmation}
                className="btn bg-base-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        {/* Delete All Confirmation Modal */}
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
              <button
                onClick={deleteAllAnnouncements}
                className="text-white btn btn-primary hover:bg-red-500"
              >
                Yes, Delete All
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
        <ToastContainer />
      </IonContent>
    </IonPage>
  );
};

export default ManageAnnouncements;
