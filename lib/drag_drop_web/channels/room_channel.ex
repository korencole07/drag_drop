defmodule DragDropWeb.RoomChannel do
  use DragDropWeb, :channel
  alias DragDropWeb.Presence

  @impl true
  def join("room:lobby", user, socket) do
    if authorized?(user) do
      send(self(), {:after_join, user})
      socket = assign(socket, user)
      {:ok, user, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_info({:after_join, msg}, socket) do
    broadcast! socket, "user:enter", %{user: msg["user_id"]}
    {:noreply, socket}
  end


  @impl true
  def handle_in("move:item", payload, socket) do
    broadcast(socket, "move:item", %{"payload" => payload,  "user_color" => socket.assigns["user_color"]})
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
