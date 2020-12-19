import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_SIDE_NAV: (curState, isTrue = !curState.globalState.isShowSideNav) => {
      let updatedglobalState = { ...curState.globalState };
      updatedglobalState = {
        ...updatedglobalState,
        isShowSideNav: isTrue
      };
      return { globalState: updatedglobalState };
    },
    TOGGLE_MAIN_NAV: (curState, isTrue = !curState.globalState.isMainNavSmall) => {
      let updatedglobalState = { ...curState.globalState };
      updatedglobalState = {
        ...updatedglobalState,
        isMainNavSmall: isTrue
      };
      return { globalState: updatedglobalState };
    },
    SET_COUNTRY_CODE: (curState, countryCode) => {
      let updatedglobalState = { ...curState.globalState };
      updatedglobalState = {
        ...updatedglobalState,
        countryCode: countryCode
      };
      return { globalState: updatedglobalState }
    }
  };

  const initialState = {
    isShowSideNav: false,
    isMainNavSmall: false,
    countryCode: ''
  };

  initStore(actions, { globalState: initialState });
};

export default configureStore;
