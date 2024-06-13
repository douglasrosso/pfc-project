"use client";

import { Flex, Progress, Space } from "antd";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <h1>Home</h1>
      <Flex style={{marginTop: "3rem"}} gap="4rem" vertical>
        <Flex gap="small" wrap>
          <Progress type="circle" percent={75} />
          <Progress type="circle" percent={70} status="exception" />
          <Progress type="circle" percent={100} />
        </Flex>
        <Space />
        <Flex gap="small" vertical>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} showInfo={false} />
        </Flex>
      </Flex>
    </Fragment>
  );
}
