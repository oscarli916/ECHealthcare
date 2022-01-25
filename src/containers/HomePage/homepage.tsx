const HomePage = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>Left</div>
        <div style={{ flexGrow: 3 }}>Right</div>
      </div>
      <div style={{ display: "flex" }}>
        <span>Update time</span>
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
