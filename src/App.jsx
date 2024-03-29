import { useQuery } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import { GET_ALL_FILMS } from "./queries";

function App() {
  const [limit, setLimit] = useState(1);
  const { data, loading, error } = useQuery(GET_ALL_FILMS, {
    variables: { first: limit },
  });
  console.log(loading, "loading");
  console.log(data, "data");
  console.log(error, "error");
  console.log(limit, "limit");
  function handleSeeMore() {
    if (limit < data?.allFilms?.totalCount) {
      setLimit((prevLimit) => prevLimit + 1);
    } else {
      setLimit(1);
    }
  }
  return (
    <div className="wrapper">
      <h1>List Items</h1>
      <div className="item-container">
        {data &&
          data?.allFilms &&
          data?.allFilms?.films?.length > 0 &&
          data?.allFilms?.films?.map((film) => (
            <div className="item" key={film?.id}>
              {film?.title}
            </div>
          ))}
      </div>
      <button onClick={handleSeeMore}>
        {data?.allFilms?.totalCount === limit ? "Change to 1" : "See more"}
      </button>
    </div>
  );
}

export default App;
