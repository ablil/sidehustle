import { notification, Tabs, Tag } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { StickyContainer } from "react-sticky";
import { v4 } from "uuid";
import BacklogList from "../../components/BacklogList";
import CustomModal from "../../components/common/CustomModal";
import ExternalLink from "../../components/common/ExternalLink";
import Close from "../../components/icons/Close";
import Loading from "../../components/icons/Loading";
import MainLayout from "../../components/layouts/MainLayout";
import NoteList from "../../components/NoteList";
import notifier from "../../helpers/notifier";
import {
  setSelectedIdea,
  toggleLoading,
  updateIdea,
} from "../../redux/slices/idea";
import { auth } from "../../services/firebaseconfig";
import service from "../../services/firebaseservice";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);

  const idea = useSelector((state) => state.ideas.current);
  const loadingIdea = useSelector((state) => state.ideas.loading);

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const [clone, setClone] = useState();

  const [modals, setModals] = useState({ repository: false, links: false });

  const [tagInputVisible, setTagInputVisible] = useState(false);
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (!id) return;
    if (!user) return;
    dispatch(toggleLoading(true));
    service.idea
      .loadSingle(id)
      .then((idea) => {
        dispatch(setSelectedIdea(idea));
        setClone(idea);
      })
      .catch((err) => notifier.error(err, "failed to load idea"))
      .finally(() => dispatch(toggleLoading(false)));
  }, [dispatch, id, router, user]);

  const updateAttribute = (attr, value) => {
    // for some reason, useState does not update immediatly,
    // it is important to create temporary object and return to be used later
    const obj = { ...clone, [attr]: value };
    setClone(obj);
    return obj;
  };

  const updateOriginal = () => {
    dispatch(setSelectedIdea(clone));
    dispatch(updateIdea(clone.id, clone));
  };

  const revertUpdate = () => {
    setClone(idea);
  };

  const hasAttributeChanged = (attr, value) => {
    return idea[attr] !== value;
  };

  const handleAttributeBlur = (evt) => {
    const attr = evt.currentTarget.dataset.attr;
    const value = evt.target.value;
    if (hasAttributeChanged(attr, value)) {
      const updated = updateAttribute(attr, value);
      service.idea
        .update(updated.id, updated)
        .then(() => updateOriginal())
        .catch((err) => notifier.error(err, `failed to update ${attr}`));
    }
  };
  const handleAttributeChange = (evt) => {
    const attr = evt.currentTarget.dataset.attr;
    const value = evt.target.value;
    setClone((old) => ({ ...old, [attr]: value }));
  };

  const handleSubmitLink = ({ link }) => {
    if (link) {
      const updated = updateAttribute("links", clone.links.concat([link]));
      service.idea
        .update(updated.id, updated)
        .then(() => updateOriginal())
        .catch((err) => notification.error(err, "failed to add link"))
        .catch(() => revertUpdate())
        .finally(() => setModals((old) => ({ ...old, links: false })));
    } else {
      setModals((old) => ({ ...old, links: false }));
    }
  };

  const handleAddTag = (evt) => {
    if (evt.key === "Enter") {
      if (tag) {
        const tagclone = tag;
        handleAddTagBlur();

        const updated = updateAttribute(
          "technologies",
          clone.technologies.concat([{ id: v4(), name: tagclone }])
        );
        service.idea
          .update(updated.id, updated)
          .then(() => updateOriginal())
          .catch((err) => notifier.error(err, "failed to add new technolgoy"))
          .catch(() => revertUpdate());
      }
    }
  };

  const handleAddTagBlur = () => {
    setTagInputVisible(false);
    setTag("");
  };

  const handleRemoveTag = (id) => {
    if (id) {
      const updated = updateAttribute(
        "technologies",
        clone.technologies.filter((tech) => tech.id !== id)
      );
      service.idea
        .update(id, updated)
        .then(() => updateOriginal())
        .catch((err) => notifier.error(err, "failed to remove technolgoy"))
        .catch(() => revertUpdate());
    }
  };

  const toggleAddTechnology = () => {
    setTagInputVisible((old) => !old);
  };

  const handleKeywordChange = (evt) => {
    setKeyword(evt.target.value);
  };

  const removeLink = (evt) => {
    const link = evt.currentTarget.dataset.link;
    if (link) {
      const updated = updateAttribute(
        "links",
        clone.links.filter((l) => l !== link)
      );
      service.idea
        .update(id, updated)
        .then(() => updateOriginal())
        .catch((err) => notifier.error(err, "failed to remove link"))
        .catch(() => revertUpdate());
    }
  };

  if (loadingIdea) {
    return <Loading />;
  }
  if (idea) {
    return (
      <MainLayout>
        <section id="details">
          <main>
            <header id="details-header">
              <input
                data-attr="title"
                value={clone.title}
                placeholder="Title"
                onChange={handleAttributeChange}
                onBlur={handleAttributeBlur}
              />
              <input
                value={keyword}
                onChange={handleKeywordChange}
                type="text"
                placeholder="search"
                className="searchbar"
              />
            </header>

            <section id="details-main">
              <StickyContainer>
                <Tabs defaultActiveKey="2" centered>
                  <Tabs.TabPane tab="Notes" key="1">
                    <NoteList keyword={keyword} />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Backlog" key="2">
                    <BacklogList keyword={keyword} />
                  </Tabs.TabPane>
                </Tabs>
              </StickyContainer>
            </section>
          </main>
          <aside>
            <header className="aside-header">
              <h1>Metadata</h1>
            </header>
            <article className="metadata-item">
              <label className="metadata-label">description</label>
              <textarea
                className="metadata-input"
                data-attr="description"
                value={clone.description}
                placeholder="Description"
                onChange={handleAttributeChange}
                onBlur={handleAttributeBlur}
              ></textarea>
            </article>
            <article className="metadata-item">
              <label className="metadata-label">
                repository <ExternalLink link={clone.repository || "#"} />
              </label>
              <input
                className="metadata-input"
                data-attr="repository"
                value={clone.repository}
                placeholder="Repository"
                onChange={handleAttributeChange}
                onBlur={handleAttributeBlur}
              />
            </article>
            <article className="metadata-item">
              <label className="metadata-label">
                tech stack
                {clone.technologies?.length > 0 &&
                  ` ( ${clone.technologies.length} ) `}
              </label>
              <div style={{ marginTop: ".5rem" }}>
                {clone.technologies.map((technology) => (
                  <Tag
                    key={technology.id}
                    className="tag"
                    closable
                    onClose={() => handleRemoveTag(technology.id)}
                  >
                    {technology.name}
                  </Tag>
                ))}
                {tagInputVisible && (
                  <input
                    id="add-technology-input"
                    type="text"
                    placeholder="type here"
                    value={tag}
                    onChange={(evt) => setTag(evt.target.value)}
                    onBlur={handleAddTagBlur}
                    onKeyDown={handleAddTag}
                  />
                )}
                {!tagInputVisible && (
                  <button onClick={toggleAddTechnology}>+ add more</button>
                )}
              </div>
            </article>

            <hr style={{ opacity: ".2" }} />
            <section className="metadata-item">
              <header className="aside-header">
                <h1>
                  Useful links{" "}
                  {clone.links?.length > 0 && ` ( ${clone.links.length} ) `}
                </h1>
              </header>
              <section id="useful-links">
                <header>
                  <button
                    onClick={() =>
                      setModals((old) => ({ ...old, links: !old.links }))
                    }
                  >
                    add new link
                  </button>
                </header>
                <hr style={{ opacity: ".1" }} />

                <article>
                  {clone.links.map((link) => (
                    <div key={link} className="link">
                      <ExternalLink link={link} />
                      <span>{link}</span>
                      <button
                        data-link={link}
                        className="link-close"
                        onClick={removeLink}
                      >
                        <Close />
                      </button>
                    </div>
                  ))}
                </article>
              </section>
              <CustomModal
                inputData={[
                  {
                    attr: "link",
                    required: true,
                  },
                ]}
                title="Useful links"
                visible={modals.links}
                onCancel={() =>
                  setModals((old) => ({ ...old, links: !old.links }))
                }
                onSubmit={handleSubmitLink}
              />
            </section>

            <hr style={{ opacity: ".2" }} />
            <footer>
              <article>
                <span>Created: </span>
                <strong>
                  {clone.created?.toDate().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
              </article>
              <article>
                <span>Last Modified: </span>
                <strong>
                  {clone.lastModified?.toDate().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
              </article>
            </footer>
          </aside>
        </section>
      </MainLayout>
    );
  } else {
    return "";
  }
};

export default Details;
