import React, { useEffect } from "react";
import {
  TextInput,
  Title,
  Container,
  Button,
  Paper,
  Center,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CirclePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import validator from "validator";
import { getUsedValues } from "../utils";

import { joinUser } from "../store/dragdrop";

export default function Login() {
  const users = useSelector((state) => state.items.users);

  const usedColors = getUsedValues(users, "user_color");
  const usedNames = getUsedValues(users, "name");

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
    let submit = false;
    const { name, color } = values;
    if (usedNames.includes(name)) {
      showNotification({
        message: "Name is already taken, please try again",
        color: "red",
      });
    }
    if (usedColors.includes(color)) {
      showNotification({
        message: "Color is already taken, please try again",
        color: "red",
      });
    }
    if (!usedColors.includes(color) && !usedNames.includes(name)) {
      submit = true;
    }

    if (submit) {
      dispatch(joinUser({ name: name, user_color: color }));
      navigate("/home");
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={{
            fontWeight: 200,
          }}
        >
          Welcome!
        </Title>
        <Center>
          <Title
            size="xs"
            mt={10}
            mb={-10}
            sx={{
              fontSize: 15,
              fontWeight: 200,
              textAlign: "center",
            }}
          >
            Please enter a name and choose a color in order to begin
          </Title>
        </Center>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label={
              <Title
                size="s"
                sx={{
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
            size="s"
            sx={{
              fontSize: 14,
              fontWeight: 250,
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
          <Button fullWidth mt="xl" variant="default" type="submit">
            <Text
              size="s"
              style={{ textTransform: "capitalize", fontWeight: 150 }}
            >
              Join
            </Text>
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
