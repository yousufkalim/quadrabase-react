import toast from "react-hot-toast";

const Notifier = (message, status, translate = (message) => message) => {
  let customMessage = translate(message);

  toast[status](customMessage, {
    duration: 3000,
    position: "top-center",
    // Styling
    style: { width: "50rem", border: "0.2px solid #c3c4c4" },
    className: "",
    // Custom Icon
    // icon: "👏",
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: status === "success" ? "green" : "red",
      secondary: "#fff",
    },
    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};
export default Notifier;
