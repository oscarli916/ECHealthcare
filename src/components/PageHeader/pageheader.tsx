import styles from "./pageheader.module.css";

interface IPageHeader {
  updateTime: string;
}

const PageHeader = ({ updateTime }: IPageHeader) => {
  return (
    <>
      <div className={styles["page-header-left"]}>
        <img
          src="ec-healthcare-logo.png"
          alt="company-logo"
          width={"50%"}
          height={"50%"}
        />
      </div>
      <div className={styles["page-header-right"]}>
        <span className={styles["time"]}>{updateTime}</span>
        <br />
        <span className={styles["update-time"]}>Last Update Time</span>
      </div>
    </>
  );
};
export default PageHeader;
