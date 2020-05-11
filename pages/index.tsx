import React, { useEffect } from "react";
import Router from "next/router";

export default function IndexPage() {
  useEffect(() => {
    Router.push("/signin");
  });

  return <div />;
}
