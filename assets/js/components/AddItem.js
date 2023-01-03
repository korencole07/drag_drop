import React, { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { addImage } from "../store/dragdrop";
import { useDispatch } from "react-redux";

const AddItem = () => {
  const [opened, setOpened] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const dispatch = useDispatch();

  function onClose(e) {
    e.preventDefault();
    if (uploadedImage) {
      const localImageUrl = window.URL.createObjectURL(uploadedImage);
      dispatch(addImage({ img_url: localImageUrl }));
    }
    setOpened(false);
  }

  return (
    <>
      <Modal opened={opened} onClose={(e) => onClose(e)} title="Add Item">
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            setUploadedImage(event.target.files[0]);
          }}
        />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add Item</Button>
      </Group>
    </>
  );
};

export default AddItem;
