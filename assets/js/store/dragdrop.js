import { combineReducers } from "redux";
import socketConnect from "../user_socket";
import { syncUsers } from "../utils";
import { Presence } from "phoenix";
import { v4 as uuid4 } from "uuid";

let socket = socketConnect();
let channel;

const MOVE_DRAG_DROP = "MOVE_DRAG_DROP";
const UPDATE_USERS = "UPDATE_USERS";

const DEFAULT_STATE = {
  users: {},
  items: [
    { img_url: "half_dome.jpg" },
    { img_url: "pizza.jpg" },
    { img_url: "mustang.jpg" },
  ],
};

function moveDragDropItems(items) {
  return {
    type: MOVE_DRAG_DROP,
    items,
  };
}

function updateUsers(users) {
  return {
    type: UPDATE_USERS,
    users,
  };
}

export function moveDragDrop(items, source, destination) {
  return (dispatch) => {
    channel
      .push("move:item", {
        items: items,
        source: source,
        destination: destination,
      })
      .receive("ok", () => {
        //console.log("item moved");
      })
      .receive("error", (error) => {
        console.error(error);
      });
  };
}

export function fetchDragDrop(user) {
  return (dispatch) => {
    channel = socket.channel("room:lobby", {
      user_id: uuid4(),
      username: user.name,
      user_color: user.user_color,
    });

    let presence = {};
    channel
      .join()
      .receive("ok", (user) => {
        console.log(
          `User ${user.user_id} with name ${user.username} joined with color ${user.user_color}`
        );
      })
      .receive("error", (reason) => {
        console.log("failed join", reason);
      });

    channel.on("move:item", (response) => {
      const { items, source, destination } = response.payload;
      items[destination]["user_id"] = response.user_id;
      items[destination]["color"] = response.user_color;
      if (items[source]["user_id"] == response.user_id)
        delete items[source]["color"];
      dispatch(moveDragDropItems(items));
    });

    //Tracks if user joins the channel
    channel.on("presence_state", (state) => {
      presence = Presence.syncState(presence, state);
      dispatch(updateUsers(syncUsers(presence)));
    });

    //Tracks if users exits the channel
    channel.on("presence_diff", (diff) => {
      presence = Presence.syncDiff(presence, diff);
      dispatch(updateUsers(syncUsers(presence)));
    });
  };
}

export function joinUser(users) {
  return (dispatch) => {
    dispatch(updateUsers(users));
  };
}

function items(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case MOVE_DRAG_DROP:
      return { ...state, items: action.items };
    case UPDATE_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
}

const itemMovingReducer = combineReducers({
  items,
});

export default itemMovingReducer;
