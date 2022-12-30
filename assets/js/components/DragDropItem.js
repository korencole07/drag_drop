import React, { useState } from "react";
import { Paper } from "@mantine/core";
import Icon from "@mui/material/Icon";

const DragDropItem = ({ icon, iconColor }) => {
  return (
    <Paper shadow="xs" p="md" m="sm">
      <Icon style={{ color: iconColor }}>{icon}</Icon>
    </Paper>
  );
};

export default DragDropItem;
