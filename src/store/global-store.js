import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_SIDE_NAV: (curState, isTrue = !curState.globalState.isShowSideNav) => {
      let updatedglobalState = { ...curState.globalState };
      console.log(updatedglobalState)
      updatedglobalState = {
        ...updatedglobalState,
        isShowSideNav: isTrue
      };
      return { globalState: updatedglobalState };
    },
    TOGGLE_MAIN_NAV: (curState, isTrue = !curState.globalState.isMainNavSmall) => {
      let updatedglobalState = { ...curState.globalState };
      console.log(updatedglobalState)
      updatedglobalState = {
        ...updatedglobalState,
        isMainNavSmall: isTrue
      };
      return { globalState: updatedglobalState };
    },
  };

  const initialState = {
    isShowSideNav: false,
    isMainNavSmall: false
  };

  initStore(actions, { globalState: initialState });
};

export default configureStore;
