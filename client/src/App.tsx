import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./components";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./configs/firebase";
import { validateUserJWTToken } from "./api";
import { toast } from "react-hot-toast";

const App = () => {
  const [user] = useAuthState(auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (user) {
        user.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            // save user in redux with data from validateUserJWTToken Or From Different Logic!!

            if (data) {
              // get shoppingCart for currentUser
            }
          });
        });
      }
    } catch (error: any) {
      toast.error(error);
    }
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default App;
