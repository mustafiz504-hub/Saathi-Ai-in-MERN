import { useEffect, useState } from "react";
import Cookies from "js-cookies";
import api from "../../api";

const UseGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.getItem("jwt");

        const response = await api.get("/allUsers", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data.users);
      } catch (error) {
        console.log("Error in get all users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
};

export default UseGetAllUsers;
