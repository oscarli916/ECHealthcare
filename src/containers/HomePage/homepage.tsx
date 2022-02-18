import React, { useEffect, useMemo, useState } from "react";
import InputFilter from "../../components/InputFilter";
import PageHeader from "../../components/PageHeader";
import { Pagination, PaginationItem } from "@mui/material";
import Table from "../../components/Table";
import { Order, TableData } from "../../types";
import styles from "./homepage.module.css";

const HomePage = () => {
  const [updateTime, setUpdateTime] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    customer: "",
    timeStart: "",
    timeEnd: "",
    dwell: "",
  });
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("customer");

  useEffect(() => {
    setInterval(() => {
      fetch("http://218.255.25.154:1618/visitors")
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          let today = new Date();
          setUpdateTime(
            `${("0" + today.getHours()).slice(-2)}:${(
              "0" + today.getMinutes()
            ).slice(-2)}:${("0" + today.getSeconds()).slice(-2)}`
          );
        });
    }, 1000);
  }, []);

  const sortedAndFilteredData = useMemo(() => {
    return sortData(
      filterData(
        data,
        filter.customer,
        filter.timeStart,
        filter.timeEnd,
        filter.dwell
      ),
      order,
      orderBy
    );
  }, [data, filter, order, orderBy]);

  const pageSize = 20;
  const totalPages = Math.ceil(sortedAndFilteredData.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const pageData = sortedAndFilteredData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const onFilterSubmit = (
    customer: string,
    timeStart: string,
    timeEnd: string,
    dwell: string
  ) => {
    setFilter({
      customer: customer,
      timeStart: timeStart,
      timeEnd: timeEnd,
      dwell: dwell,
    });
    setCurrentPage(1);
  };

  const onHeaderClick = (headerID: string) => {
    if (headerID === orderBy) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    }
    setOrderBy(headerID);
  };

  const onPaginationClickHandler = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className={styles["info-container"]}>
        <PageHeader updateTime={updateTime} />
      </div>

      <div className={styles["input-container"]}>
        <InputFilter onSubmit={onFilterSubmit} setFilter={setFilter} />
      </div>

      <div className={styles["table-container"]}>
        <Table
          data={pageData}
          order={order}
          orderBy={orderBy}
          onHeaderClickHandler={onHeaderClick}
        />

        <div className={styles["pagination-container"]}>
          <Pagination
            count={totalPages}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  color: "cornflowerblue",
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "#002db3",
                  },
                }}
              />
            )}
            onChange={onPaginationClickHandler}
          />
        </div>
      </div>
    </>
  );
};

function filterData(
  data: TableData[],
  customer: string,
  timeStart: string,
  timeEnd: string,
  dwell: string
) {
  return data.filter((d: TableData) => {
    if (timeEnd === "") {
      if (dwell === "")
        return d.customer_id.includes(customer) && d.time_in >= timeStart;
      else if (dwell === "299")
        return (
          d.customer_id.includes(customer) &&
          d.time_in >= timeStart &&
          d.dwell_time <= parseInt(dwell)
        );
      else
        return (
          d.customer_id.includes(customer) &&
          d.time_in >= timeStart &&
          d.dwell_time >= parseInt(dwell)
        );
    } else {
      if (dwell === "")
        return (
          d.customer_id.includes(customer) &&
          d.time_in >= timeStart &&
          d.time_in <= timeEnd
        );
      else if (dwell === "299")
        return (
          d.customer_id.includes(customer) &&
          d.time_in >= timeStart &&
          d.time_in <= timeEnd &&
          d.dwell_time <= parseInt(dwell)
        );
      else
        return (
          d.customer_id.includes(customer) &&
          d.time_in >= timeStart &&
          d.time_in <= timeEnd &&
          d.dwell_time >= parseInt(dwell)
        );
    }
  });
}

function sortData(data: TableData[], order: Order, orderBy: string) {
  const newData = [...data];

  switch (orderBy) {
    case "customer":
      if (order === "asc") {
        return newData.sort((a, b) =>
          a.customer_id.localeCompare(b.customer_id)
        );
      }
      return newData.sort((a, b) => b.customer_id.localeCompare(a.customer_id));
    case "time":
      if (order === "asc") {
        return newData.sort((a, b) => a.time_in.localeCompare(b.time_in));
      }
      return newData.sort((a, b) => b.time_in.localeCompare(a.time_in));
    case "dwell":
      if (order === "asc") {
        return newData.sort((a, b) => a.dwell_time - b.dwell_time);
      }
      return newData.sort((a, b) => b.dwell_time - a.dwell_time);
    case "zone":
      if (order === "asc") {
        return newData.sort((a, b) => a.zone.localeCompare(b.zone));
      }
      return newData.sort((a, b) => b.zone.localeCompare(a.zone));
    default:
      return newData;
  }
}

export default HomePage;
