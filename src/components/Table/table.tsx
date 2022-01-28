import { useState } from "react";
import styles from "./table.module.css";

type Order = "asc" | "desc";

interface HeadCell {
  id: string;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "customer", label: "Customer ID" },
  { id: "image", label: "Customer Image" },
  { id: "time", label: "Time In" },
  { id: "dwell", label: "Dwell Time" },
];

type TableData = {
  customer_id: string;
  crop_path: string;
  time_in: string;
  dwell_time: number;
};

interface ITable {
  data: TableData[];
}

const Table = ({ data }: ITable) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("customer");

  const sortedData = sortData(data, order, orderBy);

  function onHeaderClickHandler(headerID: string) {
    if (headerID === orderBy) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    }
    setOrderBy(headerID);
  }

  return (
    <table className={styles["table"]}>
      <thead>
        <tr className={styles["row"]}>
          {headCells.map((header) => (
            <th
              key={header.id}
              className={styles["header"]}
              onClick={() => onHeaderClickHandler(header.id)}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((body) => {
          return (
            <tr className={styles["row"]} key={body.customer_id}>
              <td>{body.customer_id}</td>
              <td>
                <img
                  src={`http://218.255.25.154:1618/get_crop/${body.crop_path}`}
                  alt="customer"
                  width={27}
                  height={61}
                />
              </td>
              <td>{body.time_in}</td>
              <td
                className={body.dwell_time > 300 ? styles["dwell"] : undefined}
              >
                {Math.floor(body.dwell_time / 60)} mins {body.dwell_time % 60}
                secs
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

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

    default:
      return newData;
  }
}

export default Table;
