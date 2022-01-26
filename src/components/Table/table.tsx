import styles from "./table.module.css";

const headCells = [
  "Customer ID",
  "Shop",
  "Customer Image",
  "Time In",
  "Dwell Time",
];

// Mock data
const bodyCells = [
  {
    id: "Customer #01",
    shop: "MKQ",
    image:
      "https://aircall.io/wp-content/uploads/2016/04/Meditating-on-the-cloud-870x870.png",
    in: "13:16:37",
    dwell: "10 mins 2 secs",
  },
  {
    id: "Customer #02",
    shop: "ZTSTA",
    image: "",
    in: "13:19:58",
    dwell: "7 mins 47 secs",
  },
];

const Table = () => {
  return (
    <table className={styles["table"]}>
      <thead>
        <tr className={styles["row"]}>
          {headCells.map((header) => (
            <th className={styles["header"]}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyCells.map((body) => {
          return (
            <tr className={styles["row"]}>
              <td>{body.id}</td>
              <td>{body.shop}</td>
              <td>
                <img src={body.image} alt="customer" width={27} height={61} />
              </td>
              <td>{body.in}</td>
              <td>{body.dwell}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
