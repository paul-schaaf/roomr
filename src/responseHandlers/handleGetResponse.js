import roomrapi from '../apis/roomrapi';

const handleGetResponse = async (appState) => {
  try {
    const response = await roomrapi.getAllRooms();
    appState.setState({ data: response , status: "successful"});
  } catch(err) {
    appState.setState({ status: "failed"});
  }
  try {
    setInterval(async () => {
      const response = await roomrapi.getAllRooms();
      appState.setState({ data: response , status: "successful"});
    }, 10000);
  } catch(err) {
    appState.setState({ status: "failed"});
  }
}

export default handleGetResponse;