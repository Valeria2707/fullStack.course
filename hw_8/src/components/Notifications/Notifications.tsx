import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL =
  "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/" + "notifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState<{
    data: string;
    user: string;
  }>({ data: "", user: "" });

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
    });

    socket.on("newPost", (data) => {
      setNotifications({
        data: data.message,
        user: data.user,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Сповіщення:</h2>
      {notifications.data && (
        <div>
          <strong>{notifications.user}:</strong> {notifications.data}
        </div>
      )}
    </div>
  );
};

export default Notifications;
