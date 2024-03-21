import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

interface ContainerProps {
  name: string;
}

const CreateEvent: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [eventName, setEventName] = useState<string>("");
  const [eventSource, setEventSource] = useState<string>("");
  const [eventDesc, setEventDesc] = useState<string>("");
  const [eventPlace, setEventPlace] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [organizerImage, setOrganizerImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [organizerImagePreview, setOrganizerImagePreview] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);

  const EventManagement = () => {
    history.push("/Events");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleOrganizerImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    setOrganizerImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setOrganizerImagePreview(previewUrl);
    } else {
      setOrganizerImagePreview(null);
    }
  };

  const handlePreviewClick = () => {
    if (imagePreview) {
      setIsModalOpen(true);
    } else {
      alert("Please select an image first!");
    }
  };

  const handleOrgImagePreviewClick = () => {
    if (organizerImagePreview) {
      setIsModalOpen2(true);
    } else {
      alert("Please select an image first!");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleAddEvent = async () => {
    try {
      const now = serverTimestamp();

      if (image && organizerImage) {
        const eventStorageRef = ref(storage, `event-images/${image.name}`);
        await uploadBytes(eventStorageRef, image);
        const eventImageUrl = await getDownloadURL(eventStorageRef);

        const organizerStorageRef = ref(
          storage,
          `organizer-images/${organizerImage.name}`
        );
        await uploadBytes(organizerStorageRef, organizerImage);
        const organizerImageUrl = await getDownloadURL(organizerStorageRef);

        await addDoc(collection(db, "events"), {
          name: eventName,
          eventSource,
          eventDesc,
          eventPlace,
          imageUrl: eventImageUrl,
          organizerImageUrl: organizerImageUrl,
          startDate,
          startTime,
          createdAt: now,
          updatedAt: now,
        });

        setEventName("");
        setEventSource("");
        setEventDesc("");
        setEventPlace("");
        setStartDate("");
        setStartTime("");
        setImage(null);
        setOrganizerImage(null);

        setImagePreview(null);
        setOrganizerImagePreview(null);

        console.log("Event added successfully!");
        toast.success("Event added successfully!");
        history.push("/Events");
      } else {
        console.error("Please select both event and organizer images");
      }
    } catch (error) {
      console.error("Error adding event: ", error);
      alert("Error on adding event.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-4xl font-bold">Create Event</h1>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Event Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Event Name"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                      <th>Event Place:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Event Place"
                          value={eventPlace}
                          onChange={(e) => setEventPlace(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Event Organizer:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Event Source"
                          value={eventSource}
                          onChange={(e) => setEventSource(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                      <th>Organizer Image:</th>
                      <td>
                        <input
                          type="file"
                          accept="image/jpeg, image/png, umage/gif"
                          onChange={handleOrganizerImageChange}
                          className="w-full max-w-xs file-input"
                        />
                      </td>
                      <td colSpan={2}>
                        {organizerImagePreview && (
                          <>
                            <button
                              onClick={handleOrgImagePreviewClick}
                              className="btn btn-square"
                            >
                              <Icon
                                icon="akar-icons:eye-open"
                                className="w-10 h-10"
                              />
                            </button>
                            <Modal
                              className="flex items-center justify-center w-screen h-screen space-x-2 bg-black/60"
                              isOpen={isModalOpen2}
                              onRequestClose={closeModal2}
                            >
                              <div className="flex space-x-2">
                                <img
                                  src={organizerImagePreview}
                                  alt="Organizer Image Preview"
                                  className="w-96 h-96 rounded-3xl"
                                />
                                <button
                                  onClick={closeModal2}
                                  className="btn btn-square"
                                >
                                  <Icon
                                    icon="heroicons:x-mark-16-solid"
                                    className="w-10 h-10"
                                  />
                                </button>
                              </div>
                            </Modal>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr></tr>

                    <tr>
                      <th>Date:</th>
                      <td>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                      <th>Time:</th>
                      <td>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Event Description:</th>
                      <td>
                        <textarea
                          value={eventDesc}
                          onChange={(e) => setEventDesc(e.target.value)}
                          placeholder="Event Description..."
                          className="w-full max-w-xs textarea textarea-bordered textarea-xs"
                        ></textarea>
                      </td>
                      <th>Event Image:</th>
                      <td>
                        <input
                          type="file"
                          accept="image/jpeg, image/png, umage/gif"
                          onChange={handleImageChange}
                          className="w-full max-w-xs file-input"
                        />
                      </td>
                      <td colSpan={2}>
                        {imagePreview && (
                          <>
                            <button
                              onClick={handlePreviewClick}
                              className="btn btn-square"
                            >
                              <Icon
                                icon="akar-icons:eye-open"
                                className="w-10 h-10"
                              />
                            </button>
                            <Modal
                              className="flex items-center justify-center w-screen h-screen space-x-2 bg-black/60"
                              isOpen={isModalOpen}
                              onRequestClose={closeModal}
                            >
                              <div className="flex space-x-2">
                                <img
                                  src={imagePreview}
                                  alt="Image Preview"
                                  className="w-96 h-96 rounded-3xl"
                                />
                                <button
                                  onClick={closeModal}
                                  className="btn btn-square"
                                >
                                  <Icon
                                    icon="heroicons:x-mark-16-solid"
                                    className="w-10 h-10"
                                  />
                                </button>
                              </div>
                            </Modal>
                          </>
                        )}
                      </td>
                    </tr>

                    <tr></tr>
                  </tbody>
                </table>
                <div className="flex items-center justify-between mx-5 mt-5 space-x-2">
                  <button
                    onClick={EventManagement}
                    className="btn btn-square hover:bg-base-300 "
                  >
                    <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="float-right btn bg-base-300 hover:bg-emerald-500 hover:text-white"
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                    <span>Create</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateEvent;
