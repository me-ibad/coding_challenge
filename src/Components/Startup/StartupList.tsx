import { Fragment, useState, useEffect, ReactElement } from "react";
import Container from "@mui/material/Container";
import axios from "axios";

import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

interface List {
  id: number;
  name: string;
  shortDescription: string;
  dateFounded: string;
  employees: string;
  totalFunding: number;
  currentInvestmentStage: string;
  technologyReadiness: string;
  legalEntity: string;
  usps: any[];
}

export default function StartupList(): ReactElement {
  const [data, setData] = useState<List[]>([]);
  const [filterData, setFilterData] = useState<List[]>([]);

  useEffect(() => {
    axios
      .get("/api/startups?all=true")
      .then((response) => {
        setData(response.data);
        setFilterData(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // console.log(currentItems);
  let newarr = [];
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    const indexOfLastItem = value * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the current page's items
    // currentItems = ;
    // newarr.push(data.slice(indexOfFirstItem, indexOfLastItem))
    setFilterData(data.slice(indexOfFirstItem, indexOfLastItem));
  };

  return (
    <Fragment>
      <Container maxWidth="md">
        <Pagination
          count={10}
          color="primary"
          page={page}
          onChange={handleChange}
        />

        <div id="startup-list">
          {filterData?.map((item, index) => (
            <div key={index} data-cy="startup-item" className="box">
              <Card sx={{ marginBottom: 3 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: 18 }}
                    data-cy="startup-name"
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    sx={{ color: "text.secondary", mb: 1.5, fontSize: 13 }}
                    data-cy="startup-details"
                  >
                    Founded: {item.dateFounded.substring(0, 4)} |{" "}
                    {item.employees} Employees | {item.totalFunding} $ |{" "}
                    {item.currentInvestmentStage}
                  </Typography>
                  <Typography data-cy="startup-description" variant="body2">
                    {item.shortDescription}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
