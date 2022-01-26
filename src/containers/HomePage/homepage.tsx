import CompanyInfo from "../../components/CompanyInfo";
import InputFilter from "../../components/InputFilter";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import UpdateTime from "../../components/UpdateTime";

const HomePage = () => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <CompanyInfo />
        <InputFilter />
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "2px solid grey",
          borderBottom: "2px solid grey",
          padding: "10px 0px 10px 20px",
        }}
      >
        <UpdateTime />
      </div>

      <Table />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 30,
        }}
      >
        <Pagination />
      </div>
    </>
  );
};

export default HomePage;
