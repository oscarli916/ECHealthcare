import { useCallback, useEffect, useState } from "react";
import CompanyInfo from "../../components/CompanyInfo";
import InputFilter from "../../components/InputFilter";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import UpdateTime from "../../components/UpdateTime";
import styles from "./homepage.module.css";

const HomePage = () => {
  const [updateTime, setUpdateTime] = useState("");
  // const [data, setData] = useState([
  //   {
  //     customer_id: "01",
  //     crop_path: "/home/cap/github/echealth/crop/1.jpg",
  //     time_in: "13:20:11",
  //     dwell_time: 420,
  //   },
  //   {
  //     customer_id: "02",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "13:16:17",
  //     dwell_time: 69,
  //   },
  //   {
  //     customer_id: "03",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "13:13:17",
  //     dwell_time: 345,
  //   },
  //   {
  //     customer_id: "04",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "13:11:17",
  //     dwell_time: 65,
  //   },
  //   {
  //     customer_id: "05",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "15:16:17",
  //     dwell_time: 23,
  //   },
  //   {
  //     customer_id: "06",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "14:16:17",
  //     dwell_time: 345,
  //   },
  //   {
  //     customer_id: "07",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "12:11:17",
  //     dwell_time: 76,
  //   },
  //   {
  //     customer_id: "08",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "13:16:56",
  //     dwell_time: 54,
  //   },
  //   {
  //     customer_id: "09",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "13:16:23",
  //     dwell_time: 12,
  //   },
  //   {
  //     customer_id: "10",
  //     crop_path: "/home/cap/github/echealth/crop/2.jpg",
  //     time_in: "13:16:45",
  //     dwell_time: 345,
  //   },
  // ]);

  const [data, setData] = useState([]);

  const pageSize = 20;
  const totalPages = Math.ceil(data.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * pageSize;
  const indexOfFirstData = indexOfLastData - pageSize;
  // const [pageData, setPageData] = useState(
  //   data.slice(indexOfFirstData, indexOfLastData)
  // );
  const pageData = data.slice(indexOfFirstData, indexOfLastData);

  useEffect(() => {
    setInterval(() => {
      fetch("http://218.255.25.154:1618/visitors")
        .then((res) => res.json())
        .then((data) => {
          setData(data);

          let today = new Date();
          setUpdateTime(
            `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
          );
          console.log("Get data");
        });
    }, 1000);
  }, []);

  const onFilterSubmit = useCallback(
    (
      shop: string,
      customer: string,
      timeStart: string,
      timeEnd: string,
      dwell: string
    ) => {
      // console.log("data: ", pageData);
      console.log(shop, customer, timeStart, timeEnd, dwell);
      console.log(data);
      // setPageData(data);
      // console.log(
      //   data.filter((d) => {
      //     if (timeEnd !== "")
      //       return (
      //         d.customer_id.includes(customer) &&
      //         d.time_in >= timeStart &&
      //         d.time_in <= timeEnd
      //       );
      //     else {
      //       return d.customer_id.includes(customer) && d.time_in >= timeStart;
      //     }
      //   })
      // );
    },
    []
  );

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
          currentPage={currentPage}
          totalPages={totalPages}
          onPagePrevious={onPagePreviousClickHandler}
          onPageNext={onPageNextClickHandler}
        />
      </div>
    </>
  );
};

export default HomePage;
