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
import { getServerSidePaginationAction } from 'store/actions';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import City from 'pages/City/City';

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


];

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];


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
  console.log(props?.totalData);
  console.log(props?.dataLimit);
  const pageOptions = {
    sizePerPage: props.dataLimit ? props.dataLimit : 10,
    //totalSize: props.products ? props.products.length : productsdata.length, // replace later with size(customers),
    totalSize: props?.totalData, // replace later with size(customers),
    custom: true,
  };
  console.log(props.key);

  //========== test ============= 


  const options = {
    sizePerPage: props?.dataLimit ? props?.dataLimit : "",
    //custom: true,
    totalSize: props?.totalCount,
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
      props.setPagination({
        pageIndex: page,
        dataLimit: sizePerPage
      })
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
      //props.getServerSidePaginationAction(page, sizePerPage);
      props.setPagination({
        pageIndex: page,
        dataLimit: sizePerPage
      })

      props.index = page;
      props.count = sizePerPage;
    }
  };
  //========== test ============= 


  // const ConsoleLog = ({ children }) => {
  //   console.log(children);
  //   return false;
  // }
  const handlePage = (e) => {
    console.log("I am hereerererrrrr");
    console.log(e);

    props.getServerSidePaginationAction(e, 2)
  }

  return (
    <React.Fragment>
      <PaginationProvider
        pagination={paginationFactory(options)}
        keyField="id"
        columns={props.columnData ? props.columnData : columns}
        data={props.products ? props.products : productsdata}

      >
        {({ paginationProps, paginationTableProps }) => (
          <>
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

                  <Row >
                    <Col xl="12" className="text-md-right ms-auto">
                      {/* <div className="table-responsive"> */}
                      <BootstrapTable
                        //keyField={props.key}
                        keyField="id"
                        responsive
                        // bordered={false}
                        // striped={false}
                        // defaultSorted={defaultSorted}
                        // selectRow={selectRow}
                        classes={"table align-middle table-nowrap "}
                        headerWrapperClasses={"thead-light"}
                        {...toolkitProps.baseProps}
                        {...paginationTableProps}

                      // rowEvents={rowEvents}
                      />

                      {/* </div> */}
                    </Col>

                  </Row>

                  {/* <Row className="align-items-md-center mt-30">
                    <Col className="inner-custom-pagination d-flex">
                      <div className="d-inline">
                        <SizePerPageDropdownStandalone {...paginationProps} />
                      </div>
                      <div className="text-md-right ms-auto">
                        <PaginationListStandalone {...paginationProps} />
                      </div>
                    </Col>
                  </Row> */}
                </React.Fragment>
              )}

            </ToolkitProvider>
          </>
        )}
      </PaginationProvider>
    </React.Fragment>
    // <BootstrapTable
    //   keyField="id"
    //   //keyField="1"
    //   columns={props.columnData ? props.columnData : columns}
    //   data={props.products ? props.products : productsdata}
    //   pagination={paginationFactory(options)}
    // />
  );
};

//export default DatatableTables2;

const mapStateToProps = state => {

  const {


  } = state.zoneCity;

  return {

  };
};

export default withRouter(
  connect(mapStateToProps,
    {

      getServerSidePaginationAction
    })(DatatableTables2)
);
