import Calendar from "../../ui/calendar/Calendar";

const Info = ({children}) => {
  const days = [
    { date: '2025-01-01', label: '01', details: 'New Year\'s Day' },
    { date: '2025-01-02', label: '02', details: 'Sample Event' },
  ];

  return (
    <div>
      <h1>Info</h1>
      <Calendar days={days}/>
    </div>
  );
};

export default Info;