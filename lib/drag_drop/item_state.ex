defmodule DragDrop.ItemState do
  use Agent

  def start_link(initial_state) do
    Agent.start_link(fn -> initial_state end, name: __MODULE__)
  end

  def get_items_state() do
    Agent.get(__MODULE__, fn state -> get_items_state(state) end)
  end

  def update_items(items) do
    Agent.update(__MODULE__, fn state -> update_items(state, items) end)
  end

  def delete_item(image) do
    Agent.update(__MODULE__, fn state -> delete_item(state, image) end)
  end

  def add_item(image) do
    Agent.update(__MODULE__, fn state -> add_item(state, image) end)
  end

  defp update_items(state, items) do
    put_in(state.items, items)
  end

  defp delete_item(state, image) do
    new_state = Enum.filter(state.items, fn x -> x["img_url"] != image end)
    put_in(state.items, new_state)
  end

  defp add_item(state, image) do
    put_in(state.items, Enum.reverse([image | state.items]))
  end

  defp get_items_state(state) do
      state.items
  end

  def reset_items() do
    Agent.update(__MODULE__, fn (_) -> %{items: [%{"img_url" => "/images/half_dome.jpg"}, %{"img_url" => "/images/pizza.jpg"}, %{"img_url" => "/images/mustang.jpg"}]} end)
  end

end
