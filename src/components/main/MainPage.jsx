import { useEffect, useState } from "react";
import ChatContainer from "../../containers/ChatContainer";
import { getCurrentTime } from "../../lib/date";

const MainPage = () => {
  const [now, setNow] = useState(getCurrentTime());
  
  useEffect(() => {
    setNow(getCurrentTime());
  }, []);

  return (
    <div>
      <ChatContainer now={now} />
    </div>
  );
};

export default MainPage;
