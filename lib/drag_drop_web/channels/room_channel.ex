defmodule DragDropWeb.RoomChannel do
  use DragDropWeb, :channel

  @impl true
  #can assign a user id here, using assign
  def join("room:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end


  @impl true
  def handle_in("move:item", payload, socket) do
    broadcast(socket, "move:item", payload)
    {:reply, {:ok, payload}, socket}
  end

  # Add authorization logic here as required.
  def authorized?(_payload) do
    true
  end
end
