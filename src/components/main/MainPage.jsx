import { useEffect, useState } from "react";
import ChatContainer from "../../containers/ChatContainer";
import { getCurrentTime } from "../../lib/date";

const MainPage = () => {
  const [now, setNow] = useState(getCurrentTime());

  useEffect(() => {
    setNow(getCurrentTime());
  }, []);

  const temp = {
    day: "23",
    hours: "1",
    minutes: "22",
    month: "01",
    seconds: "20",
    year: 2025,
  };

  return (
    <div>
      <ChatContainer now={temp} />
    </div>
  );
};

export default MainPage;
