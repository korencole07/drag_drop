import React from "react";
import {
  TextInput,
  Title,
  Container,
  Button,
  Paper,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CirclePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import validator from "validator";

import { joinUser } from "../store/dragdrop";

export default function Login() {
  const form = useForm({
    initialValues: { name: "", color: "" },

    validate: {
      name: (value) =>
        value.length < 3 || value.length > 25
          ? "Name must have at least 2 letters"
          : null,
      color: (value) => (value.length > 5 ? null : "Invalid Color"),
    },
  });

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleError = (errors) => {
    if (errors.name) {
      showNotification({
        message: "Name field should be between 3 and 25 characters",
        color: "red",
      });
    } else if (errors.color) {
      showNotification({
        message: "Please select a color",
        color: "red",
      });
    }
  };

  const handleSubmit = (values) => {
    const { name, color } = values;
    dispatch(joinUser({ name: name, user_color: color }));
    navigate("/home");
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={{
            textTransform: "uppercase",
            fontWeight: 200,
          }}
        >
          Welcome!
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label={
              <Title
                size="s"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
              >
                Name
              </Title>
            }
            required
            withAsterisk={false}
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue(
                "name",
                validator.escape(event.currentTarget.value)
              )
            }
          />
          <Title
            size="xs"
            sx={{
              textTransform: "uppercase",
              fontSize: 14,
              fontWeight: 300,
            }}
          >
            Color
          </Title>
          <Center>
            <CirclePicker
              style={{ marginLeft: 20 }}
              color={form.values.color}
              onChange={(color) => form.setFieldValue("color", color.hex)}
            />
          </Center>
          <Button fullWidth mt="xl" type="submit">
            Join
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
