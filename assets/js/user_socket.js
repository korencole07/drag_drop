import { Socket } from "phoenix";

export default function socketConnection() {
  let socket = new Socket("/socket", { params: { token: window.userToken } });
  socket.connect();
  return socket;
}
