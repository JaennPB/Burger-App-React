export const updateState = (prevState, newState) => {
  return {
    ...prevState,
    ...newState,
  };
};
