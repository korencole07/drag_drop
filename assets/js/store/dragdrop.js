import { combineReducers } from "redux";
import socketConnect from "../user_socket";
import { syncUsers } from "../utils";
import { Presence } from "phoenix";
import { v4 as uuid4 } from "uuid";

let socket = socketConnect();
let channel;

const MOVE_DRAG_DROP = "MOVE_DRAG_DROP";
const UPDATE_USERS = "UPDATE_USERS";
const ADD_IMAGE = "ADD_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";

const DEFAULT_STATE = {
  users: {},
  items: [
    { img_url: "/images/half_dome.jpg" },
    { img_url: "/images/pizza.jpg" },
    { img_url: "/images/mustang.jpg" },
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

function addImageFile(image) {
  return {
    type: ADD_IMAGE,
    image,
  };
}

function deleteImageFile(image) {
  return {
    type: DELETE_IMAGE,
    image,
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

    channel.on("add:item", (response) => {
      const { image } = response.payload;
      dispatch(addImageFile(image));
    });

    channel.on("delete:item", (response) => {
      const { image } = response.payload;
      dispatch(deleteImageFile(image));
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

export function addImage(image) {
  return (dispatch) => {
    channel
      .push("add:item", {
        image: image,
      })
      .receive("ok", () => {
        console.log("item added");
      })
      .receive("error", (error) => {
        console.error(error);
      });
  };
}

export function deleteImage(image) {
  return (dispatch) => {
    channel
      .push("delete:item", {
        image: image,
      })
      .receive("ok", () => {
        console.log("item deleted");
      })
      .receive("error", (error) => {
        console.error(error);
      });
  };
}

function items(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case MOVE_DRAG_DROP:
      return { ...state, items: action.items };
    case UPDATE_USERS:
      return { ...state, users: action.users };
    case ADD_IMAGE:
      return {
        ...state,
        items: [...state.items, action.image],
      };
    case DELETE_IMAGE:
      return {
        ...state,
        items: state.items.filter((item) => item.img_url !== action.image),
      };
    default:
      return state;
  }
}

const itemMovingReducer = combineReducers({
  items,
});

export default itemMovingReducer;
