import styles from "./companyinfo.module.css";

const CompanyInfo = () => {
  return (
    <div className={styles["company-info"]}>
      <div>
        <img src="" alt="company-logo" width={0} height={0} />
      </div>
      <span>Location Tracking System</span>
    </div>
  );
};

export default CompanyInfo;
