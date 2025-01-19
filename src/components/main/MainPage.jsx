import { useEffect, useState } from "react";
import ChatContainer from "../../containers/ChatContainer";
import { getDocument } from "../../lib/firebase/readFireStore";
import { getToday } from "../../lib/date";

const MainPage = () => {
  const [today, setToday] = useState("20250116");

  useEffect(() => {
    console.log("20")
    setToday("20250119");
  },[]);

  return (
    <div>
      <ChatContainer today={today}/>
    </div>
  );
};

export default MainPage;
