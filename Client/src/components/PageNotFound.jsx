import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 Page Not Found</h1>
      <button onClick={() => navigate("/login")}>Login Page</button>
    </div>
  );
};

export default PageNotFound;
