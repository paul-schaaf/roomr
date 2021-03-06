const axiosErrorHandler = async (fn, appState, reqData) => {
  try {
    await fn(appState, reqData);
  } catch (err) {
    // this error appears when there is an error from the client (e.g. room already exists);
    if (err.response) {
      appState.setState({
        responseMessage: err.response.data.message,
        errorType: err.response.data.type,
      });
    } else if (err.request) { // this error appears when there is no response from the server
      appState.setState({ getStatus: 'failed', errorType: 'serverError' });
    } else { // this error appears when a custom error is created in roomrapi.js before axios runs
      appState.setState({ responseMessage: err.message, errorType: 'clientError' });
    }
  }
};


export default axiosErrorHandler;

/*
* axiosErrorHandler wraps whatever function given to it and executes it within a try-catch block
* it also requires "appState" so it can change the state in App.js
* finally it nmay need reqData which is the form data used to make a request to the server
* roomrapi functions, passed into the error Handler get the reqData to use with axios
* and also the appState for state changes that depend on the roomrapi function being used
*/
