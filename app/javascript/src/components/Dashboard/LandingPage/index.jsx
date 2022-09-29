import React from "react";

import { Button, Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import Table from "components/Dashboard/Table";

import ActionDropDown from "./ActionDropDown";
import SideMenuBar from "./MenuBar";

const LandingPage = () => (
  //const [searchTerm, setSearchTerm] = useState("");
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
              onClick={() => {}}
            />
          </div>
        }
        searchProps={{
          //value: searchTerm,
          //onChange: (e) => setSearchTerm(e.target.value),
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
