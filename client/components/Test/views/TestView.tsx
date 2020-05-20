/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test.views
 */

import React from "react";

export interface ITestView {
  /**
   * 화면에 표시할 테스트 데이터입니다.
   */
  data: any;
}

/**
 * 테스트 화면입니다.
 */
export function TestView(props: ITestView) {
  return <div>{JSON.stringify(props.data)}</div>;
}
