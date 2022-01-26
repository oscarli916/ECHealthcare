import CompanyInfo from "../../components/CompanyInfo";
import InputFilter from "../../components/InputFilter";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import UpdateTime from "../../components/UpdateTime";
import styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <>
      <div className={styles["info-container"]}>
        <CompanyInfo />
        <InputFilter />
      </div>
      <div className={styles["time-container"]}>
        <UpdateTime />
      </div>

      <Table />

      <div className={styles["pagination-container"]}>
        <Pagination />
      </div>
    </>
  );
};

export default HomePage;
