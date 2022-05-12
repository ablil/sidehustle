import { notification } from "antd";

const notifier = {
  success: (title, message) => {
    notification.success({
      message: title,
      description: message || "",
      placement: "top",
    });
  },
  error: (err, message) => {
    console.error(err);
    notification.error({ message: message || err.message, placement: "top" });
  },
};

export default notifier;
