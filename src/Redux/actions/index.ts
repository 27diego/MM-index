import history from "../../history";
import { AppActions } from "../../types/Actions";
import { Dispatch } from "redux";
import { AppState } from "../Store/configureStore";

export const signIn = (username: string, password: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    await fetch("http://localhost:3000/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data != null && typeof data === "object") {
          dispatch({ type: "SIGN_IN", payload: data });
          dispatch({ type: "ERROR", payload: "" });
          history.push("/Dashboard");
        } else {
          dispatch({ type: "ERROR", payload: data });
        }
      })
      .catch(err => console.log(err));
  };
};