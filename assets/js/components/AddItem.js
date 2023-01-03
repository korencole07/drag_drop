import React, { useState } from "react";
import { Modal, Group, FileInput, Text, Button } from "@mantine/core";
import { addImage } from "../store/dragdrop";
import { useDispatch } from "react-redux";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const AddItem = () => {
  const [opened, setOpened] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const dispatch = useDispatch();

  function onClose() {
    setOpened(false);
  }

  function onUpload(e) {
    e.preventDefault();
    if (uploadedImage) {
      const localImageUrl = window.URL.createObjectURL(uploadedImage);
      dispatch(addImage({ img_url: localImageUrl }));
    }
    setUploadedImage(null);
    onClose();
  }

  return (
    <>
      <Modal
        size={500}
        opened={opened}
        onClose={(e) => onClose(e)}
        title={
          <Text
            size="s"
            style={{ textTransform: "capitalize", fontWeight: 150 }}
          >
            Add Item
          </Text>
        }
      >
        <Group>
          <FileInput
            w={350}
            placeholder={
              <Text
                size="s"
                style={{ textTransform: "capitalize", fontWeight: 150 }}
              >
                Choose Image
              </Text>
            }
            value={uploadedImage}
            onChange={(value) => {
              setUploadedImage(value);
            }}
            accept="image/png,image/jpeg"
            icon={<FileUploadOutlinedIcon />}
          />
          <Button variant="default" onClick={(e) => onUpload(e)}>
            <Text
              size="s"
              style={{ textTransform: "capitalize", fontWeight: 150 }}
            >
              Upload
            </Text>
          </Button>
        </Group>
      </Modal>

      <Group position="center">
        <Button variant="default" onClick={() => setOpened(true)}>
          <Text
            size="s"
            style={{ textTransform: "capitalize", fontWeight: 150 }}
          >
            Add Item
          </Text>
        </Button>
      </Group>
    </>
  );
};

export default AddItem;
