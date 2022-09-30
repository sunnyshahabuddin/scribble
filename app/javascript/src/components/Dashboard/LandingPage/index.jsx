import React from "react";

import { Button, Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import { ARTICLE_CREATE_PATH } from "components/routeConstants";

import ActionDropDown from "./ActionDropDown";
import SideMenuBar from "./MenuBar";
import Table from "./Table";

const LandingPage = () => (
  <div className="flex items-start">
    <SideMenuBar />
    <Container>
      <Header
        actionBlock={
          <div className="flex">
            <ActionDropDown />
            <Button
              className="mx-2"
              icon="ri-add-line"
              label="Add New Article"
              to={ARTICLE_CREATE_PATH}
            />
          </div>
        }
        searchProps={{
          placeholder: "Search article title",
        }}
      />
      <Typography className="mb-5" style="h3">
        67 Articles
      </Typography>
      <Table />
    </Container>
  </div>
);
export default LandingPage;
