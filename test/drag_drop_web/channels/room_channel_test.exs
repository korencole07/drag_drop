defmodule DragDropWeb.RoomChannelTest do
  use DragDropWeb.ChannelCase
  alias DragDropWeb.Presence

  setup do
    {:ok, _, socket} =
      DragDropWeb.UserSocket
      |> socket("user", %{"user_id" => "1", "user_color" => "#FFFFFF"})
      |> subscribe_and_join(DragDropWeb.RoomChannel, "room:lobby")


      on_exit(fn ->
        for pid <- DragDropWeb.Presence.fetchers_pids() do
          ref = Process.monitor(pid)
          assert_receive {:DOWN, ^ref, _, _, _}, 1000
        end
      end)

    %{socket: socket}
  end


  test "move:item is broadcast with payload", %{socket: socket} do
    #When an item is moved, test that relevant information is sent with it
    push(socket, "move:item", %{"payload" => [%{"icon" => "test1.png"},%{"icon" => "test2.png"}]})
    assert_broadcast "move:item", %{"payload" => %{"payload" => [%{"icon" => "test1.png"}, %{"icon" => "test2.png"}]},"user_color" => "#FFFFFF"}
  end

  test "test presence user sync", %{socket: socket} do
    #Get user information from presence, check to make sure it is consistent for what was sent in
    [user] = Presence.list(socket)["1"].metas

    assert user.user_color == "#FFFFFF"
    assert user.user_id == "1"

    {:ok, _, socket} =
      DragDropWeb.UserSocket
      |> socket("user", %{"user_id" => "2", "user_color" => "#000000"})
      |> subscribe_and_join(DragDropWeb.RoomChannel, "room:lobby")

    [user2] = Presence.list(socket)["2"].metas

    assert user2.user_color == "#000000"
    assert user2.user_id == "2"

  end



end
