import { ArrowDropDown } from "@mui/icons-material";
import { TableSortLabel } from "@mui/material";
import { useState } from "react";
import { Order, TableData } from "../../types";
import ModalImage from "../ModalImage";
import styles from "./table.module.css";

interface HeadCell {
  id: string;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "customer", label: "Customer" },
  { id: "zone", label: "Zone" },
  { id: "image", label: "Image" },
  { id: "time", label: "Time In" },
  { id: "dwell", label: "Dwell Time" },
];

interface ITable {
  data: TableData[];
  order: Order;
  orderBy: string;
  onHeaderClickHandler: (headerID: string) => void;
}

const Table = ({ data, order, orderBy, onHeaderClickHandler }: ITable) => {
  const [clickedImg, setClickedImg] = useState("");

  return (
    <>
      <table className={styles["table"]}>
        <thead>
          <tr className={styles["header-row"]}>
            {headCells.map((header: HeadCell) => (
              <th key={header.id} className={styles["header"]}>
                {header.label}
                <TableSortLabel
                  active={
                    header.id === "zone" || header.id === "image" ? false : true
                  }
                  direction={orderBy === header.id ? order : "asc"}
                  IconComponent={ArrowDropDown}
                  onClick={() => onHeaderClickHandler(header.id)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((body: TableData) => {
            return (
              <tr className={styles["row"]} key={body.customer_id}>
                <td>Customer #{body.customer_id}</td>
                <td>{body.zone}</td>
                <td>
                  <img
                    src={`http://218.255.25.154:1618/get_crop/${body.crop_path}`}
                    alt="customer"
                    width={27}
                    height={61}
                    onClick={() => setClickedImg(body.crop_path)}
                  />
                </td>
                <td>{body.time_in}</td>
                <td>
                  <div
                    className={
                      body.dwell_time > 300
                        ? styles["dwell-red"]
                        : styles["dwell"]
                    }
                  >
                    {Math.floor(body.dwell_time / 60)} mins{" "}
                    {body.dwell_time % 60} secs
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {clickedImg && (
        <ModalImage clickedImg={clickedImg} setClickedImg={setClickedImg} />
      )}
    </>
  );
};

export default Table;
