import { useOutletContext } from "react-router-dom";

const Report = () => {
  const { user } = useOutletContext();
  return <div>You're on report page, {user?.name}</div>;
};

export default Report;
