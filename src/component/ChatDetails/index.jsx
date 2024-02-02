import style from "./chatdetails.module.css";
import chatIcon from "../../assets/chatIcon.svg";
import { getData, deleteData } from "../../utils";
const ChartDetails = ({ chatId, time, details, updateData }) => {
  const deleteChat = () => {
    const deleteConfirmation = window.confirm(
      "Are you sure!! you want to delete this data"
    );
    if (deleteConfirmation) {
      console.log("DATA Deleted");
      deleteData(chatId)
        .then((res) => getData())
        .then((res) => {
          updateData(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={style.cardDetailsContainer}>
      <img src={chatIcon} className={style.img} />
      <div className={style.container}>
        <div className={style.subContainer}>
          <h4>~anonymous~ -</h4>
          <p className={style.time}>{time}</p>
          <button className={style.deleteBtn} onClick={deleteChat}>
            Delete
          </button>
        </div>
        <p className={style.details}>{details}</p>
      </div>
    </div>
  );
};

export default ChartDetails;
