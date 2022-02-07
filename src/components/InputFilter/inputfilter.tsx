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
              {TIMESTAMP_OPTIONS.map((time) => (
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
              {TIMESTAMP_OPTIONS.map((time) => (
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
