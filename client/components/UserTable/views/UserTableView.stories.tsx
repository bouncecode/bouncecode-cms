/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.UserTable.views
 */

import * as React from "react";
import { SnackbarProvider } from "notistack";
import { UserTableView } from "./UserTableView";
import { withKnobs, number, object } from "@storybook/addon-knobs";
import { ITableDataCallback } from "client/commons/interfaces";

export default {
  title: "UserTable/UserTableView",
  component: UserTableView,
  decorators: [withKnobs],
};

export const defaultView = () => {
  const data: ITableDataCallback = async (query) => {
    return {
      data: object("data", [
        {
          id: 1,
          email: "test@example.com",
          isAdmin: true,
          payload: { displayName: "홍길동" },
          createdDate: new Date(),
          updatedDate: new Date(),
        },
      ]),
      page: number("page", 1),
      totalCount: number("totalCount", 100), // TODO: totalCount
    };
  };

  return (
    <SnackbarProvider>
      <UserTableView data={data} />
    </SnackbarProvider>
  );
};
