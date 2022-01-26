import CompanyInfo from "../../components/CompanyInfo";
import InputFilter from "../../components/InputFilter";
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
      <table style={{ width: "100%" }}>
        <tr>
          <th>Customer ID</th>
          <th>Shop</th>
          <th>Customer Image</th>
          <th>Time In</th>
          <th>Dwell Time</th>
          <th>Approach</th>
        </tr>
      </table>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button>Last</button>
        2/5
        <button>Next</button>
      </div>
    </>
  );
};

export default HomePage;
