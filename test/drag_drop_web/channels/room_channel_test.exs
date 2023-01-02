defmodule DragDropWeb.RoomChannelTest do
  use DragDropWeb.ChannelCase

  setup do
    {:ok, _, socket} =
      DragDropWeb.UserSocket
      |> socket("user", %{"user_id" => "12345", "user_color" => "#FFFFFF"})
      |> subscribe_and_join(DragDropWeb.RoomChannel, "room:lobby")

    %{socket: socket}
  end

  test "move:item is broadcast with payload", %{socket: socket} do
    push(socket, "move:item", %{"payload" => [%{"icon" => "test1.png"},%{"icon" => "test2.png"}]})
    assert_broadcast "move:item", %{"payload" => %{"payload" => [%{"icon" => "test1.png"}, %{"icon" => "test2.png"}]},"user_color" => "#FFFFFF"}
  end

end
