import styles from "./inputfilter.module.css";

const InputFilter = () => {
  return (
    <div className={styles["input-filter"]}>
      <form>
        <div className={styles["input-filter-row"]}>
          <label>Shop</label>
          <select className={styles["input-shop"]} name="shop" id="shop">
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
            >
              <option value={""}></option>
              <option value={"12:00"}>12:00</option>
              <option value={"12:05"}>12:05</option>
            </select>
            -
            <select
              className={styles["input-time-right"]}
              name="end-time"
              id="end-time"
            >
              <option value={""}></option>
              <option value={"12:00"}>12:00</option>
              <option value={"12:05"}>12:05</option>
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
            >
              <option value={""}></option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
            </select>
          </label>
        </div>
        <div className={styles["input-button"]}>
          <button className={styles["input-button-left"]} type="button">
            Search
          </button>
          <button className={styles["input-button-right"]} type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputFilter;
