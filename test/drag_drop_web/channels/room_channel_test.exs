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

  test "on join, get default items", %{socket: socket} do
    {:ok, _, socket} = DragDropWeb.UserSocket
      |> socket("user", %{"user_id" => "3", "user_color" => "#test"})
      |> subscribe_and_join(DragDropWeb.RoomChannel, "room:lobby")

    assert_broadcast "user:enter", %{item_state: [
          %{"img_url" => "/images/half_dome.jpg"},
          %{"img_url" => "/images/pizza.jpg"},
          %{"img_url" => "/images/mustang.jpg"}
        ]
      }
  end

  test "move:item is broadcast with payload and response", %{socket: socket} do
    #When an item is moved, test that relevant information is sent with it
    push(socket, "move:item", %{"payload" => [%{"icon" => "test1.png"},%{"icon" => "test2.png"}]})
    assert_broadcast "move:item", %{"payload" => %{"payload" => [%{"icon" => "test1.png"}, %{"icon" => "test2.png"}]},"user_color" => "#FFFFFF"}
  end

  test "test presence user sync", %{socket: socket} do
    #Get user information from presence, check to make sure it is consistent for what was sent in
    [user] = Presence.list(socket)["1"].metas

    assert user.user_color == "#FFFFFF"
    assert user.user_id == "1"

    {:ok, _, socket2} =
      DragDropWeb.UserSocket
      |> socket("user", %{"user_id" => "2", "user_color" => "#000000"})
      |> subscribe_and_join(DragDropWeb.RoomChannel, "room:lobby")

    [user2] = Presence.list(socket)["2"].metas

    assert user2.user_color == "#000000"
    assert user2.user_id == "2"

  end


  test "add:item is broadcast with payload", %{socket: socket} do
    push(socket, "add:item", %{"image" => "new_image.png"})
    assert_broadcast "add:item", %{"payload" => %{"image" => "new_image.png"}}
  end


  test "delete:item is broadcast with payload", %{socket: socket} do
    push(socket, "delete:item", %{"image" => "test1.png"})
    assert_broadcast "delete:item", %{"payload" => %{"image" => "test1.png"}}
  end

end
