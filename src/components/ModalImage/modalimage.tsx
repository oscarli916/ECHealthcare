import React from "react";
import styles from "./modalimage.module.css";

interface IModalImage {
  clickedImg: string;
  setClickedImg: React.Dispatch<React.SetStateAction<string>>;
}

const ModalImage = ({ clickedImg, setClickedImg }: IModalImage) => {
  const onModalClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).tagName === "DIV") setClickedImg("");
  };

  return (
    <div className={styles["modal"]} onClick={onModalClickHandler}>
      <img
        className={styles["modal-image"]}
        src={`http://218.255.25.154:1618/get_crop/${clickedImg}`}
        alt="bigger customer"
        width={275}
        height={635}
      />
    </div>
  );
};

export default ModalImage;
