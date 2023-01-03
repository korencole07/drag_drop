defmodule DragDrop.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      DragDropWeb.Telemetry,
      {Phoenix.PubSub, name: DragDrop.PubSub},
      DragDropWeb.Endpoint,
      DragDropWeb.Presence,
      {DragDrop.Monitor, []},
      {DragDrop.ItemState, %{"items": [%{"img_url" => "/images/half_dome.jpg"}, %{"img_url" => "/images/pizza.jpg"}, %{"img_url" => "/images/mustang.jpg"}]}}
    ]

    opts = [strategy: :one_for_one, name: DragDrop.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    DragDropWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
