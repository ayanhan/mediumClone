import React, {Fragment, useEffect} from 'react';
import Feed from "../../components/Feed";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/Pagination";
import {getPaginator, limit} from "../../utils";
import {stringify} from "query-string"
import PopularTags from "../../components/PopularTags";
import FeedToggler from "../../components/FeedToggler";

const TagFeed = ({location, match}) => {
  const tagName = match.params.slug

  const {offset, currentPage} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName
  })
  const [{response, isLoading, error}, doFetch] = useFetch(`https://conduit.productionready.io/api/articles?${stringifiedParams}`)
  const url = match.url

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage, tagName])
  return (
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1>Medium</h1>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedToggler tagName={tagName} />
              {isLoading && <div>Loading...</div>}
              {error && <div className="danger">Some Error Happened</div>}
              {!isLoading && response && (
                  <Fragment>
                    <Feed articles={response.articles} />
                    <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
                  </Fragment>
              )}
            </div>
            <div className="col-md-3">
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
  );
};

export default TagFeed;
