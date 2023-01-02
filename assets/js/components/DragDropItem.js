import React from "react";
import { Paper, Group } from "@mantine/core";
import CircleIcon from "@mui/icons-material/Circle";

const DragDropItem = ({ img, iconColor }) => {
  return (
    <Paper shadow="xs" p="md" m="sm" sx={{ display: "flex" }}>
      <Group noWrap spacing={10} mt={3}>
        <CircleIcon style={{ color: iconColor ? iconColor : "white" }} />
        <img style={{ height: 200, width: 400 }} src={`/images/${img}`} />
      </Group>
    </Paper>
  );
};

export default DragDropItem;
