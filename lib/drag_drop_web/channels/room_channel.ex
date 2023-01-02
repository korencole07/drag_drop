defmodule DragDropWeb.RoomChannel do
  use DragDropWeb, :channel
  alias DragDropWeb.Presence

  @impl true
  def join("room:lobby", user, socket) do
    if authorized?(user) do
      send(self(), :after_join)
      {:ok, user, assign(socket, user)}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_info(:after_join, socket) do
    user = socket.assigns
    broadcast! socket, "user:enter", %{user: user}

    {:ok, _} = Presence.track(socket, user["user_id"], %{
      user_id: user["user_id"],
      user_color: user["user_color"]
    })

    push socket, "presence_state", Presence.list(socket)

    {:noreply, socket}
  end


  @impl true
  def handle_in("move:item", payload, socket) do
    broadcast(socket, "move:item", %{"payload" => payload,  "user_id" => socket.assigns["user_id"], "user_color" => socket.assigns["user_color"]})
    {:reply, :ok, socket}
  end

  def handle_in("user:enter", payload, socket) do
    broadcast(socket, "user:enter", payload)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  def authorized?(_payload) do
    true
  end
end
