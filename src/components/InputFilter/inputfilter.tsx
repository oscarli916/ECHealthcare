import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./inputfilter.module.css";
import {
  START_TIME,
  END_TIME,
  INTERVAL_MINUTES,
} from "./inputfilter.constants";

interface IInputFilter {
  onSubmit: (
    customer: string,
    timeStart: string,
    timeEnd: string,
    dwell: string
  ) => void;
}

const InputFilter = ({ onSubmit }: IInputFilter) => {
  const TIMESTAMP_OPTIONS = [
    "",
    ...getIntervalTimestamps(START_TIME, END_TIME, INTERVAL_MINUTES),
  ];
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
    <form className={styles["input-filter"]} onSubmit={onSubmitHandler}>
      <div className={styles["input-label"]}>
        <div className={styles["input-customer"]}>
          <label>Customer ID</label>
          <input
            type={"text"}
            name="id"
            id="id"
            onChange={onCustomerChangeHandler}
            value={customer}
          />
        </div>
        <div className={styles["input-time"]}>
          <label>Time in</label>

          <select
            name="start-time"
            id="start-time"
            onChange={onTimeStartChangeHandler}
            value={timeStart}
          >
            {TIMESTAMP_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <span>-</span>
        <div className={styles["input-time"]}>
          <label>Time out</label>
          <select
            name="end-time"
            id="end-time"
            onChange={onTimeEndChangeHandler}
            value={timeEnd}
          >
            {TIMESTAMP_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["input-dwell"]}>
          <label>Dwell Time</label>
          <select
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
        </div>
      </div>

      <div className={styles["input-button"]}>
        <button
          className={styles["input-button-left"]}
          type="reset"
          onClick={onResetClickHandler}
        >
          Reset
        </button>
        <button className={styles["input-button-right"]} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

function getIntervalTimestamps(start: number, end: number, interval: number) {
  let timestampOptions: string[] = [];

  for (let hour = start; hour < end; hour += 1) {
    for (let minute = 0; minute < 60; minute += interval) {
      let hourStr = hour.toString();
      let minuteStr = minute.toString();

      if (hour < 10) hourStr = `0${hour}`;
      if (minute === 0) minuteStr = "00";
      timestampOptions.push(`${hourStr}:${minuteStr}`);
    }
  }
  timestampOptions.push(`${end}:00`);
  return timestampOptions;
}

export default InputFilter;
