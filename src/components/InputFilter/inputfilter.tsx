import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./inputfilter.module.css";
import { TIME } from "./inputfilter.constants";

interface IInputFilter {
  onSubmit: (
    customer: string,
    timeStart: string,
    timeEnd: string,
    dwell: string
  ) => void;
}

const InputFilter = ({ onSubmit }: IInputFilter) => {
  const [customer, setCustomer] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [dwell, setDwell] = useState("");

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    onSubmit(customer, timeStart, timeEnd, dwell);
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
    setCustomer("");
    setTimeStart("");
    setTimeEnd("");
    setDwell("");
  }

  return (
    <div className={styles["input-filter"]}>
      <form onSubmit={onSubmitHandler}>
        <div className={styles["input-filter-row"]}>
          <label>
            Customer ID
            <input
              className={styles["input-customer"]}
              type={"text"}
              name="id"
              id="id"
              onChange={onCustomerChangeHandler}
              value={customer}
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
              value={timeStart}
            >
              {TIME.map((time) => (
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
              value={timeEnd}
            >
              {TIME.map((time) => (
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
              value={dwell}
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
