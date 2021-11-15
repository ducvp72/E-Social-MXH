import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { axios } from "axios";
export const InfinitieScroll = () => {
  const [items, setItem] = useState();
  useEffect(() => {
    const getData = async () => {
      await axios({
        method: `GET`,
        url: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5`,
      })
        .then((res) => {
          console.log(res);
          if (res) setItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  const fetchData = () => {};

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      ></InfiniteScroll>
    </>
  );
};
