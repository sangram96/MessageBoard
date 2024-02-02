import style from "./app.module.css";
import Header from "./component/Header";
import ChartDetails from "./component/ChartDetails";
import { useEffect, useState } from "react";
import * as Moment from "moment";
import { getData } from "./utils";

// Items per page
const itemsPerPage = 5;

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getMessages = async () => {
    const response = await getData();
    setData(response);
  };
  
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className={style.container}>
      <Header data={data} updateData={setData} />
      <div className={style.chatDetails}>
        {currentItems.map((val) => (
          <ChartDetails
            key={val.id}
            chatId={val.id}
            time={Moment(val.timestamp).format("hh:mm:ss A")}
            details={val.text}
            updateData={setData}
          />
        ))}
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button className={style.nextBtn} key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
