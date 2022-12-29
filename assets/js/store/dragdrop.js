import { combineReducers } from "redux";
import socketConnection from "../user_socket";

let socket = socketConnection();
let channel = socket.channel("room:lobby", {});

const MOVE_DRAG_DROP = "MOVE_DRAG_DROP";

const DEFAULT_ITEMS = [
  { icon: "ac_unit" },
  { icon: "local_pizza" },
  { icon: "agriculture" },
];

function moveDragDropItems(items) {
  return {
    type: MOVE_DRAG_DROP,
    items,
  };
}

export function moveDragDrop(items) {
  return (dispatch) => {
    channel
      .push("move:item", {
        items: items,
      })
      .receive("ok", (response) => {
        console.log("item moved", response);
      })
      .receive("error", (error) => {
        console.error(error);
      });
  };
}

export function fetchDragDrop(items) {
  return (dispatch) => {
    channel
      .join()
      .receive("ok", () => {
        console.log("joined");
      })
      .receive("error", (reason) => {
        console.log("failed join", reason);
      });

    channel.on("move:item", (payload) => {
      console.log("move:item", payload.items);
      dispatch(moveDragDropItems(payload.items));
    });
  };
}

function items(state = DEFAULT_ITEMS, action) {
  switch (action.type) {
    case MOVE_DRAG_DROP:
      return action.items;

    default:
      return state;
  }
}

const itemMovingReducer = combineReducers({
  items,
});

export default itemMovingReducer;
