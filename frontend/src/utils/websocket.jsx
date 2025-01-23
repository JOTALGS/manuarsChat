export const initializeWebSocket = (url, onMessage) => {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };
  
  ws.onmessage = (event) => {
    //console.log('Received message:', event.data);
    try {
      const message = event.data;
      onMessage(message);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  ws.onclose = () => console.log('WebSocket disconnected');

  return ws;
};