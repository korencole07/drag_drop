defmodule DragDropWeb.RoomChannel do
  use DragDropWeb, :channel
  alias DragDropWeb.Presence
  alias DragDrop.ItemState
  alias DragDrop.Monitor


  @impl true
  def join("room:lobby", user, socket) do

    :ok = Monitor.monitor(self())

    if authorized?(user) do
      send(self(), :after_join)
      {:ok, user, assign(socket, user)}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_info(:after_join, socket) do
    items_state = ItemState.get_items_state()
    user = socket.assigns

    broadcast! socket, "user:enter", %{item_state: items_state}

    {:ok, _} = Presence.track(socket, user["user_id"], %{
      user_id: user["user_id"],
      name: user["username"],
      user_color: user["user_color"]
    })

    push socket, "presence_state", Presence.list(socket)

    {:noreply, socket}
  end

  @impl true
  def handle_in("update:user", payload, socket) do
    socket = assign(socket, payload)
    Presence.update(socket, socket.assigns["user_id"], %{user_color: payload["user_color"],  name: payload["name"], user_id: socket.assigns["user_id"]})
    {:noreply, socket}
  end

  @impl true
  def handle_in("move:item", payload, socket) do
    broadcast(socket, "move:item", %{"payload" => payload,  "user_id" => socket.assigns["user_id"], "user_color" => socket.assigns["user_color"]})
    {:reply, :ok, socket}
  end

  @impl true
  def handle_in("add:item", payload, socket) do
    ItemState.add_item(payload["image"])
    broadcast(socket, "add:item", %{"payload" => payload})
    {:reply, :ok, socket}
  end

  @impl true
  def handle_in("delete:item", payload, socket) do
    ItemState.delete_item(payload["image"])
    broadcast(socket, "delete:item", %{"payload" => payload})
    {:reply, :ok, socket}
  end

  @impl true
  def handle_in("update:item", payload, socket) do
    ItemState.update_items(payload["items"])
    broadcast(socket, "update:item", %{"payload" => payload})
    {:reply, :ok, socket}
  end

  def handle_in("user:enter", payload, socket) do
    IO.inspect(payload)
    broadcast(socket, "user:enter", payload)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  def authorized?(_payload) do
    true
  end

end
