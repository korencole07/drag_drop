defmodule DragDropWeb.PageControllerTest do
  use DragDropWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "<div id=\"root\"></div>"
  end
end
