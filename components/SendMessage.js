import Moralis from "moralis";
import { useState } from "react";
import { useMoralis } from "react-moralis";

function SendMessage({ endOfMessagesRef }) {
  const { user } = useMoralis();
  const [message, setMessage] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;
    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();
    messages
      .save({
        message: message,
        username: user.getUsername(),
        ethAddress: user.get("ethAddress"),
      })
      .then(
        (message) => {},
        (error) => {
          console.log(error);
        }
      );
    endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    setMessage("");
  };
  return (
    <form className="flex fixed bottom-10 bg-black opacity-80 px-6 py-4 w-11/12 max-w-2xl shadow-xl rounded-full border-4 border-blue-400">
      <input
        type="text"
        className="outline-none flex-grow bg-transparent text-white placeholder-gray-500 pr-5"
        placeholder={`Enter a Message ${user.getUsername()}...`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        type="submit"
        className="font-bold text-pink-500"
      >
        Send
      </button>
    </form>
  );
}

export default SendMessage;
