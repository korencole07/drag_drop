import React from "react";
import { Table, Text, ScrollArea } from "@mantine/core";
import CircleIcon from "@mui/icons-material/Circle";

export function UserContainer({ users }) {
  const rows = users.map((user) => (
    <tr key={user.phx_ref}>
      <td>
        <Text
          size="xs"
          sx={{ textTransform: "uppercase" }}
          weight={700}
          color="dimmed"
        >
          {user.user_id}
        </Text>
      </td>
      <td>
        <CircleIcon style={{ color: user.user_color }} />
      </td>
    </tr>
  ));

  return (
    users.length > 0 && (
      <ScrollArea>
        <Table verticalSpacing="sm">
          <thead>
            <tr>
              <th>User</th>
              <th>Color</th>
              {/* <th>Last active</th>
            <th>Status</th> */}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    )
  );
}
