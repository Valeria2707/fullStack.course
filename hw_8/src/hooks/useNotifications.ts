import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SOCKET_SERVER_URL =
  "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/" + "notifications";

const useNotifications = () => {
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
    });

    socket.on("newPost", (data) => {
      toast.info(`${data.user}: ${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        icon: false,
        style: {
          backgroundColor: "#ffff",
          color: "#870047",
          border: "1px solid #ff69b4",
        },
        progressStyle: {
          backgroundColor: "#ffb3c1",
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useNotifications;
