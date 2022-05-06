import { Tag } from "antd";
import React from "react";
import ExternalLink from "./common/ExternalLink";
import Close from "./icons/Close";

const IdeaSummary = ({ idea, onRemove }) => {
  const handleRemove = () => {
    onRemove(idea);
  };
  return (
    <section className="idea">
      <article className="header">
        <a className="title" href={`/ideas/${idea.id}`}>
          {idea.title || "n/a"}
        </a>
        <button className="close" onClick={handleRemove}>
          <Close />
        </button>
        <span className="status" data-status={idea.status || "active"}>
          {idea.status || "active"}
        </span>
      </article>
      <article className="description" title={idea.description}>
        {idea.description || "n/a"}
      </article>
      <footer>
        <article className="repository">
          <a href={idea.repository || "#"} target="_blank" rel="noreferrer">
            repository
          </a>
          <ExternalLink link={idea.repository} />
        </article>
        <article title="lastModified">
          {idea.lastModified?.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </article>
      </footer>
    </section>
  );
};

export default IdeaSummary;
