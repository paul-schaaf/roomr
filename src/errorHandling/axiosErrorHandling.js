const errorHandler = async (fn, appState) => {
  try {
    await fn(appState);
  } catch(err) {
    if(err.response) {
      console.log(err);
    } else if (err.request) {
      appState.setState({ status: "failed"});
    }
  }
};


export default errorHandler;