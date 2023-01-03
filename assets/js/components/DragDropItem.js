import React from "react";
import { Paper, Group } from "@mantine/core";
import CircleIcon from "@mui/icons-material/Circle";
import { ActionIcon, Menu } from "@mantine/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteImage } from "../store/dragdrop";
import { useDispatch } from "react-redux";

const DragDropItem = ({ img, iconColor }) => {
  const dispatch = useDispatch();

  function deleteItem(e) {
    e.preventDefault();
    dispatch(deleteImage(img));
  }

  return (
    <Paper shadow="xs" p="md" m="sm" sx={{ display: "flex" }}>
      <Group noWrap spacing={10} mt={3}>
        <CircleIcon style={{ color: iconColor ? iconColor : "white" }} />
        <img style={{ height: 200, width: 400 }} src={img} />
        <Menu transition="pop" withArrow position="bottom-end">
          <Menu.Target>
            <ActionIcon>
              <MoreHorizIcon />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<DeleteIcon />}
              onClick={(e) => deleteItem(e)}
              color="red"
            >
              Delete Item
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
};

export default DragDropItem;
