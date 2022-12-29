defmodule DragDropWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :drag_drop


  @session_options [
    store: :cookie,
    key: "_drag_drop_key",
    signing_salt: "tJYqqtgM"
  ]

  socket "/socket", DragDropWeb.UserSocket,
    websocket: true,
    longpoll: false


  plug Plug.Static,
    at: "/",
    from: :drag_drop,
    gzip: false,
    only: ~w(assets fonts images favicon.ico robots.txt)

  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Phoenix.LiveDashboard.RequestLogger,
    param_key: "request_logger",
    cookie_key: "request_logger"

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug DragDropWeb.Router
end
