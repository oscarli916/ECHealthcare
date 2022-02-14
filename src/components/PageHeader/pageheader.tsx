import styles from "./pageheader.module.css";

interface IPageHeader {
  updateTime: string;
}

const PageHeader = ({ updateTime }: IPageHeader) => {
  return (
    <>
      <div className={styles["page-header-left"]}>
        <img
          src="dayta_logo_001-01.png"
          alt="company-logo"
          width={"100%"}
          height={90}
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
