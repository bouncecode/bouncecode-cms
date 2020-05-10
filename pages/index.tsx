import React, { useEffect } from "react";
import Router from "next/router";

export default function Index() {
  useEffect(() => {
    Router.push("/admin");
  });

  return <div />;
}
