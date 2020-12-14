import { useCallback, useReducer } from "react";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { ...curHttpState, loading: true, data: null };
    case "RESPONSE":
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { ...curHttpState, loading: false, error: action.error };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback((url, reqExtra) => {
    dispatchHttp({ type: "SEND" });
    axios.get(url).then((response) => {
      dispatchHttp({
        type: "RESPONSE",
        responseData: response.data,
        extra: reqExtra,
      });
    })
    .catch(error => {
      console.log(error)
    });
  }, []);

  return {
    isLoading: httpState.isLoading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
  };
};

export default useHttp;
