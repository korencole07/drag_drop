import { Presence } from "phoenix";

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function syncUsers(presence) {
  const participants = [];
  Presence.list(presence).map((p) => {
    participants.push(p.metas[0]);
  });
  return participants;
}

export function getUsedValues(users, value) {
  switch (value) {
    case "user_color":
      return Object.values(users)
        .map((a) => a.user_color)
        .filter((a) => a !== null);
    case "name":
      return Object.values(users)
        .map((a) => a.name)
        .filter((a) => a !== null);
    default:
      return [];
  }
}
