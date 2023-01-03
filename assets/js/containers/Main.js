import React, { useEffect } from "react";
import DragDropContainer from "./DragDropContainer";
import { Grid } from "@mantine/core";
import { UserContainer } from "./UserContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchDragDrop } from "../store/dragdrop";
import AddItem from "../components/AddItem";

const Main = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const users = useSelector((state) => state.items.users);

  useEffect(() => {
    dispatch(fetchDragDrop(users));
  }, []);

  return (
    users.length && (
      <Grid columns={3}>
        <Grid.Col span={2}>
          <DragDropContainer items={items} dispatch={dispatch} />
        </Grid.Col>
        <Grid.Col span={1}>
          <UserContainer users={users} />
          <AddItem />
        </Grid.Col>
      </Grid>
    )
  );
};

export default Main;
