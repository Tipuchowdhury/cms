import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";


// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

// import ToolkitProvider, {
//   Search,
// } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "./datatables.scss";

// Table data
const productsdata = [
  {
    id: 1,
    name: "Airi Satou",
    position: "Accountant",
    office: "Tokyo",
    age: "33",
    startdate: "2008/11/28",
    salary: "$162,700",
  },

  {
    id: 2,
    name: "Angelica Ramos",
    position: "Chief Executive Officer (CEO)",
    office: "London",
    age: "47",
    startdate: "2009/10/09",
    salary: "$1,200,000",
  },

  {
    id: 3,
    name: "Ashton Cox",
    position: "Junior Technical Author",
    office: "San Francisco",
    age: "66",
    startdate: "2009/01/12",
    salary: "$86,000",
  },

  {
    id: 4,
    name: "Bradley Greer",
    position: "Software Engineer",
    office: "London",
    age: "41",
    startdate: "2012/10/13",
    salary: "$132,000",
  },

  {
    id: 5,
    name: "Brenden Wagner",
    position: "Software Engineer",
    office: "San Francisco",
    age: "28",
    startdate: "2011/06/07",
    salary: "$206,850",
  },
];

const columns = [
  {
    dataField: "id",
    text: "Id",
    sort: true,
  },
  {
    dataField: "reference",
    text: "Reference",
    sort: true,
  },
  {
    dataField: "owner",
    text: "Owner",
    sort: true,
  },
  {
    dataField: "tenant",
    text: "Tenant",
    sort: true,
  },
  {
    dataField: "manager",
    text: "Manager",
    sort: true,
  },
  {
    dataField: "teams",
    text: "Teams",
    sort: true,
  },
  {
    dataField: "labels",
    text: "Labels",
    sort: true,
  },
  {
    dataField: "days",
    text: "Days",
    sort: true,
  },
];

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

// Select All Button operation
// const selectRow = {
//   mode: "checkbox",
// };

const { SearchBar } = Search;

//meta title
document.title = "Data Tables | Skote - React Admin & Dashboard Template";

const DatatableTables2 = props => {

  //let history = useHistory();

  // const [state, setState] = useState({
  //   page: 1,
  //   sizePerPage: 10,
  //   productData: props.products ? props.products.data : null,
  // });
  // useEffect(() => {
  //   setState({
  //     ...state,
  //     productData: props.products ? props.products.data : null,
  //   });
  // }, [props]);


  // const rowEvents = {
  //   onClick: (e, row, rowIndex) => {
  //     history.push(props.url ? props.url + row.id : '', { id: row.id });
  //   }
  // };

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.products ? props.products.length : productsdata.length, // replace later with size(customers),
    custom: true,
  };

  return (
    <React.Fragment>
      <PaginationProvider
        pagination={paginationFactory(pageOptions)}
        keyField={props.key ? key : "1"}
        columns={props.columnData ? props.columnData : columns}
        data={props.products ? props.products : productsdata}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="key_number"
            columns={props.columnData ? props.columnData : columns}
            data={props.products ? props.products : productsdata}
            search
          >
            {toolkitProps => (
              <React.Fragment>
                <Row>
                  <div className="d-flex justify-content-end search-box">
                    <SearchBar {...toolkitProps.searchProps} />
                    {/* <i className="bx bx-search-alt search-icon" /> */}
                  </div>
                  {/* <Col md="4">
                    <div className="search-box d-inline-block">
                      <div className="position-relative">
                        <SearchBar
                          {...toolkitProps.searchProps}
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                  </Col> */}
                </Row>

                <Row>
                  <Col xl="12">
                    <div className="table-responsive">
                      <BootstrapTable
                        keyField={props.key}
                        responsive
                        bordered={false}
                        striped={false}
                        defaultSorted={defaultSorted}
                        // selectRow={selectRow}
                        classes={"table align-middle table-nowrap"}
                        headerWrapperClasses={"thead-light"}
                        {...toolkitProps.baseProps}
                        {...paginationTableProps}

                      // rowEvents={rowEvents}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-md-center mt-30">
                  <Col className="inner-custom-pagination d-flex">
                    <div className="d-inline">
                      <SizePerPageDropdownStandalone {...paginationProps} />
                    </div>
                    <div className="text-md-right ms-auto">
                      <PaginationListStandalone {...paginationProps} />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
    </React.Fragment>
  );
};

export default DatatableTables2;
