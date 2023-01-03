defmodule DragDrop.Monitor do
  use GenServer
  require Logger
  alias DragDrop.ItemState

  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(arg) do
    Process.flag(:trap_exit, true)
    {:ok, arg}
  end

  def monitor(pid) do
    GenServer.cast(__MODULE__, {:monitor, pid})
  end


  def handle_cast({:monitor, pid}, state) do
    Process.monitor(pid)
    {:noreply, [pid | state]}
  end


  def handle_info({:DOWN, _ref, :process, current, _}, state) do
    #When users have left the channel, we want to reset to the initial order of items
    Logger.info("DOWN")
    list = List.delete(state, current)

    if length(list) == 0 do
      ItemState.reset_items()
    end

    {:noreply, list}
  end


end
