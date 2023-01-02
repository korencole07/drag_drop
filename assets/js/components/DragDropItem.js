import React, { useState } from "react";
import { Paper } from "@mantine/core";
import Icon from "@mui/material/Icon";

const DragDropItem = ({ img, iconColor }) => {
  return (
    <Paper shadow="xs" p="md" m="sm" sx={{ display: "flex" }}>
      <Icon style={{ color: iconColor, paddingRight: 25, marginTop: 90 }}>
        circle
      </Icon>
      <img style={{ height: 200, width: 400 }} src={`/images/${img}`} />
    </Paper>
  );
};

export default DragDropItem;
