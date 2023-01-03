import React from "react";
import { Table, Text, ScrollArea, Title, Center } from "@mantine/core";
import CircleIcon from "@mui/icons-material/Circle";

export function UserContainer({ users }) {
  const rows = users.map((user) => (
    <tr key={user.phx_ref}>
      <td style={{ textAlign: "center" }}>
        <Title
          size="xs"
          sx={{ textTransform: "uppercase" }}
          weight={200}
          color="dimmed"
        >
          {user.name}
        </Title>
      </td>
      <td style={{ textAlign: "center" }}>
        <CircleIcon style={{ color: user.user_color }} />
      </td>
    </tr>
  ));

  return (
    users.length > 0 && (
      <Center>
        <ScrollArea>
          <Title
            align="center"
            sx={{
              textTransform: "uppercase",
              fontWeight: 200,
            }}
          >
            Active Users
          </Title>
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th>
                  <Title
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: 20,
                      fontWeight: 200,
                    }}
                  >
                    Users
                  </Title>
                </th>
                <th>
                  <Title
                    align="center"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: 20,
                      fontWeight: 200,
                    }}
                  >
                    Color
                  </Title>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Center>
    )
  );
}
