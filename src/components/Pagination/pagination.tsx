import styles from "./pagination.module.css";

const Pagination = () => {
  return (
    <>
      <button className={styles["button-left"]} type="button">
        Last
      </button>
      2/5
      <button className={styles["button-right"]} type="button">
        Next
      </button>
    </>
  );
};

export default Pagination;
