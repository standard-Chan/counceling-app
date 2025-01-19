import { useEffect, useState } from "react";
import ChatContainer from "../../containers/ChatContainer";
import { getDocument } from "../../lib/firebase/readFireStore";
import { getToday } from "../../lib/date";

const MainPage = () => {
  const [today, setToday] = useState(getToday());
  
  useEffect(() => {
    setToday(getToday());
  },[]);

  return (
    <div>
      <ChatContainer today={today}/>
    </div>
  );
};

export default MainPage;
