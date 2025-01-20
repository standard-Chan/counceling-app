import { useEffect, useState } from "react";
import ChatContainer from "../../containers/ChatContainer";
import { getDocument } from "../../lib/firebase/readFireStore";
import { getCurrentTime, getToday } from "../../lib/date";

const MainPage = () => {
  const [now, setNow] = useState(getCurrentTime());
  
  useEffect(() => {
    setNow(getCurrentTime());
  },[]);

  return (
    <div>
      <ChatContainer now={now}/>
    </div>
  );
};

export default MainPage;
