import { useState } from "react";
import ChatContainer from "../../containers/ChatContainer";
import { getDocument } from "../../lib/firebase/readFireStore";

const MainPage = () => {
  const [today, setToday] = useState("20250116");

  return (
    <div>
      <ChatContainer today={today}/>
    </div>
  );
};

export default MainPage;
