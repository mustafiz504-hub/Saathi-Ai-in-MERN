/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookies";
export const AuthContext = createContext();

function AuthProvider ({ children }) {
  //yahape hamne cookie me token store kiya hai or wo token hamne localstorage me se liye he
  const initialUserState =
    Cookies.getItem("jwt") || localStorage.getItem("messenger");

  //parse the user data and stories in state
  const [authUser, setAuthUser] = useState(
    //parse q karte he
    //ans q ki jab local storage me data save hoti he toh wo string ki form me hoti he parse karne pe wo object ke form me banjati he
    initialUserState ? JSON.parse(initialUserState) : undefined,
  );

  return (
    <>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
