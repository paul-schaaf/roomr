const errorHandler = async (fn, appState, reqData) => {
  try {
    await fn(appState, reqData);
  } catch(err) {
    if(err.response) {
      appState.setState({"errorMessage":err.response.data});
    } else if (err.request) {
      appState.setState({ getStatus: "failed"});
    } else {
      appState.setState({"errorMessage":err.message});
    }
  }
};


export default errorHandler;