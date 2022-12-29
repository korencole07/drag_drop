defmodule DragDropWeb.RoomChannelTest do
  use DragDropWeb.ChannelCase

  setup do
    {:ok, _, socket} =
      DragDropWeb.UserSocket
      |> socket("user_id", %{some: :assign})
      |> subscribe_and_join(DragDropWeb.RoomChannel, "room:lobby")

    %{socket: socket}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from!(socket, "broadcast", %{"some" => "data"})
    assert_push "broadcast", %{"some" => "data"}
  end

  test "move:item is broadcast with payload", %{socket: socket} do
    push(socket, "move:item", %{"items" => [%{"icon" => "test1"},%{"icon" => "test2"},]})
    assert_broadcast "move:item", %{"items" => [%{"icon" => "test1"},%{"icon" => "test2"},]}
  end
end
