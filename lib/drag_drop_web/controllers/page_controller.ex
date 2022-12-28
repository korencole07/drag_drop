defmodule DragDropWeb.PageController do
  use DragDropWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
