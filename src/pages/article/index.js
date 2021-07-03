import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import {Link} from "react-router-dom";
import TagList from "../../components/TagList";

const Article = (props) => {
  const slug = props.match.params.slug
  const [{response, error, isLoading}, doFetch] = useFetch(`https://conduit.productionready.io/api/articles/${slug}`)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
      <div className="article-page">
        <div className="banner">
          {!isLoading && response && (
              <div className="container">
                <h1>{response.article.title}</h1>
                <div className="article-meta">
                  <Link to={`/profiles/${response.article.author.username}`}>
                    <img src={response.article.author.image} alt=''/>
                  </Link>
                  <div className="info">
                    <Link to={`/profiles/${response.article.author.username}`}>
                      {response.article.author.username}
                      <span className="date">
                        {response.article.createAt}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
          )}
        </div>
        <div className="container page">
          {isLoading && (<div>Loading...</div>)}
          {error && (<div>Some error happened :(</div>)}
          {!isLoading && response && (
              <div className="row article-content">
                <div className="col-xs-12">
                  <div>
                    <p>{response.article.body}</p>
                  </div>
                  <TagList tags={response.article.tagList} />
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Article;
