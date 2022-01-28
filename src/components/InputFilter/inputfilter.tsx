import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./inputfilter.module.css";

const times: string[] = [
  "",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
];

interface IInputFilter {
  onSubmit: any;
}

const InputFilter = ({ onSubmit }: IInputFilter) => {
  const [shop, setShop] = useState("");
  const [customer, setCustomer] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [dwell, setDwell] = useState("");

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    onSubmit(shop, customer, timeStart, timeEnd, dwell);
  }

  function onShopChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setShop(e.target.value);
  }

  function onCustomerChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setCustomer(e.target.value);
  }

  function onTimeStartChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setTimeStart(e.target.value);
  }

  function onTimeEndChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setTimeEnd(e.target.value);
  }

  function onDwellChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setDwell(e.target.value);
  }

  function onResetClickHandler() {
    setShop("");
    setCustomer("");
    setTimeStart("");
    setTimeEnd("");
    setDwell("");
  }

  return (
    <div className={styles["input-filter"]}>
      <form onSubmit={onSubmitHandler}>
        <div className={styles["input-filter-row"]}>
          <label>Shop</label>
          <select
            className={styles["input-shop"]}
            name="shop"
            id="shop"
            onChange={onShopChangeHandler}
          >
            <option value={""}></option>
            <option value={"MKQ"}>MKQ</option>
            <option value={"ZTSTA"}>ZTSTA</option>
          </select>
        </div>

        <div className={styles["input-filter-row"]}>
          <label>
            Customer ID
            <input
              className={styles["input-customer"]}
              type={"text"}
              name="id"
              id="id"
              onChange={onCustomerChangeHandler}
            />
          </label>
        </div>

        <div className={styles["input-filter-row"]}>
          <label>
            Time in
            <select
              className={styles["input-time-left"]}
              name="start-time"
              id="start-time"
              onChange={onTimeStartChangeHandler}
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            -
            <select
              className={styles["input-time-right"]}
              name="end-time"
              id="end-time"
              onChange={onTimeEndChangeHandler}
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles["input-filter-row"]}>
          <label>
            Dwell Time
            <select
              className={styles["input-dwell"]}
              name="dwell-time"
              id="dwell-time"
              onChange={onDwellChangeHandler}
            >
              <option value={""}></option>
              <option value={"299"}>5 minutes</option>
              <option value={"300"}>5+ minutes</option>
              <option value={"600"}>10+ minutes</option>
            </select>
          </label>
        </div>
        <div className={styles["input-button"]}>
          <button className={styles["input-button-left"]} type="submit">
            Search
          </button>
          <button
            className={styles["input-button-right"]}
            type="reset"
            onClick={onResetClickHandler}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputFilter;
