import { Socket } from "phoenix";

export default function socketConnect() {
  let socket = new Socket("/socket");
  socket.connect();

  return socket;
}
