import React, {useEffect} from 'react';
import useFetch from "../hooks/useFetch";
import {Link} from "react-router-dom";

const PopularTags = () => {
  const [{response, isLoading, error}, doFetch] = useFetch('https://conduit.productionready.io/api/tags')

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (isLoading) {
    return (
        <div>Loading...</div>
    )
  }

  if (error || !response) {
    return (
        <div>Something went wrong with server. Sorry :(</div>
    )
  }

  return (
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {response.tags.map(tag => (
              <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
                {tag}
              </Link>
          ))}
        </div>
      </div>
  );
};

export default PopularTags;
