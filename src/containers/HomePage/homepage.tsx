import { useEffect, useMemo, useState } from "react";
import CompanyInfo from "../../components/CompanyInfo";
import InputFilter from "../../components/InputFilter";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import UpdateTime from "../../components/UpdateTime";
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

  useEffect(() => {
    setInterval(() => {
      fetch("http://218.255.25.154:1618/visitors")
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          let today = new Date();
          setUpdateTime(
            `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
          );
        });
    }, 1000);
  }, []);

  const filteredData = useMemo(() => {
    return filterData(
      data,
      filter.customer,
      filter.timeStart,
      filter.timeEnd,
      filter.dwell
    );
  }, [data, filter]);

  const pageSize = 1;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  const pageData = filteredData.slice(indexOfFirstData, indexOfLastData);

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

  const onPagePreviousClickHandler = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const onPageNextClickHandler = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className={styles["info-container"]}>
        <CompanyInfo />
        <InputFilter onSubmit={onFilterSubmit} />
      </div>
      <div className={styles["time-container"]}>
        <UpdateTime updateTime={updateTime} />
      </div>

      <Table data={pageData} />

      <div className={styles["pagination-container"]}>
        <Pagination
          currentPage={totalPages === 0 ? 0 : currentPage}
          totalPages={totalPages}
          onPagePrevious={onPagePreviousClickHandler}
          onPageNext={onPageNextClickHandler}
        />
      </div>
    </>
  );
};

function filterData(
  data: any,
  customer: string,
  timeStart: string,
  timeEnd: string,
  dwell: string
) {
  return data.filter((d: any) => {
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

export default HomePage;
