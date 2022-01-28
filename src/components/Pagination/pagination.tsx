import styles from "./pagination.module.css";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPagePrevious: () => void;
  onPageNext: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPagePrevious,
  onPageNext,
}: IPagination) => {
  return (
    <>
      <button
        className={styles["button-left"]}
        type="button"
        onClick={onPagePrevious}
      >
        Last
      </button>
      {currentPage}/{totalPages}
      <button
        className={styles["button-right"]}
        type="button"
        onClick={onPageNext}
      >
        Next
      </button>
    </>
  );
};

export default Pagination;
