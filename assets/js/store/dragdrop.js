import { combineReducers } from "redux";
import channelConnect from "../user_socket";

let channel = channelConnect();

const MOVE_DRAG_DROP = "MOVE_DRAG_DROP";

const DEFAULT_ITEMS = [
  { icon: "ac_unit", color: "black" },
  { icon: "local_pizza", color: "black" },
  { icon: "agriculture", color: "black" },
];

function moveDragDropItems(items) {
  console.log("in move drag drop items", items);
  return {
    type: MOVE_DRAG_DROP,
    items,
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
        console.log("item moved");
      })
      .receive("error", (error) => {
        console.error(error);
      });
  };
}

export function fetchDragDrop(items) {
  return (dispatch) => {
    channel.on("move:item", (response) => {
      console.log("move:item", response);
      const { items, source, destination } = response.payload;
      items[source]["color"] = "black";
      items[destination]["color"] = response.user_color;
      dispatch(moveDragDropItems(items));
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
