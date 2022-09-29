import React from "react";

import { Button } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import Table from "components/Dashboard/Table";

import SideMenuBar from "./MenuBar";

const LandingPage = () => (
  //const [searchTerm, setSearchTerm] = useState("");
  <div className="flex items-start">
    <SideMenuBar />
    <Container>
      <Header
        actionBlock={
          <Button
            icon="ri-add-line"
            label="Add New Article"
            onClick={() => {}}
          />
        }
        searchProps={{
          //value: searchTerm,
          //onChange: (e) => setSearchTerm(e.target.value),
          placeholder: "Search article title",
        }}
      />
      <Table />
    </Container>
  </div>
);
export default LandingPage;
