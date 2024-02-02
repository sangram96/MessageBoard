import style from "./header.module.css";
import { getData } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { postData, deleteData } from "../../utils";
import loadingGif from "../../assets/loading.gif";
import * as Moment from "moment";
const Header = ({ data, updateData }) => {
  const inputRef = useRef();
  const [inProgress, setInProgress] = useState(false);

  const clickHandler = () => {
    const text = inputRef.current.value;
    if (text === "" || text === " ") {
      alert("Please enter proper chat to post!!!!!");
      return;
    }
    postData(inputRef.current.value)
      .then((res) => {
        return getData();
      })
      .then((res) => updateData(res))
      .catch((err) => {
        console.log(err);
      });
    inputRef.current.value = "";
  };

  const deleteHandler = () => {
    const deleteConfirmation = window.confirm(
      "Are you sure !! you want to delete all items ??"
    );
    setInProgress(!inProgress);
    if (deleteConfirmation) {
      console.log("deleted");
      setInProgress(true);
      Promise.allSettled(
        data.map((val) => {
          return deleteData(val.id);
        })
      )
        .then((res) => {
          setInProgress(false);
          return getData();
        })
        .then((res) => updateData(res))
        .catch((err) => console.log(err));
    }
  };

  const filterHandler = () => {
    const arr = data.sort((a, b) => Moment(b.timestamp) - Moment(a.timestamp));
    updateData([...arr]);
  };

  return (
    <div className={style.container}>
      {inProgress && (
        <div className={style.loader}>
          <img src={loadingGif} />
        </div>
      )}
      <h2>Chatter</h2>
      <p className={style.subTitle}>
        Type Something in the box below, then hit "Post"
      </p>
      <div>
        <input type="text" ref={inputRef} />
        <button className={style.postBtn} onClick={clickHandler}>
          Post!
        </button>
        <button className={style.deleteBtn} onClick={deleteHandler}>
          Delete All
        </button>
        <button className={style.fliterBtn} onClick={filterHandler}>
          Filter by timestamp
        </button>
      </div>
    </div>
  );
};

export default Header;
