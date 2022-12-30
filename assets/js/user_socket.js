import { Socket } from "phoenix";
import { v4 as uuid4 } from "uuid";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function channelConnect() {
  const userToken = uuid4();

  let socket = new Socket("/socket", {
    params: { token: userToken },
  });
  socket.connect();

  let channel = socket.channel("room:lobby", {
    user_id: userToken,
    user_color: getRandomColor(),
  });
  channel
    .join()
    .receive("ok", (user) => {
      console.log(`User ${user.user_id} joined with color ${user.user_color}`);
    })
    .receive("error", (reason) => {
      console.log("failed join", reason);
    });

  channel.on("user:enter", (msg) => {
    console.log("Howdy partner a user entered", msg);
  });

  return channel;
}
