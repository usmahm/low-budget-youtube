import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_SIDE_DRAWER: (curState, isTrue = !curState.globalState.isShowSideDrawer) => {
      let updatedglobalState = { ...curState.globalState };
      console.log(isTrue)
      updatedglobalState = {
        ...updatedglobalState,
        isShowSideDrawer: isTrue
      };
      return { globalState: updatedglobalState };
    },
  };

  const initialState = {
    isShowSideDrawer: true,
  };

  initStore(actions, { globalState: initialState });
};

export default configureStore;
