import React, { useEffect, useMemo, useState } from "react";
import { NextSeo } from "next-seo";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import CustomModal from "../../components/common/CustomModal";
import Plus from "../../components/icons/Plus";
import IdeaSummary from "../../components/IdeaSummary";
import MainLayout from "../../components/layouts/MainLayout";
import notifier from "../../helpers/notifier";
import gtm from "../../lib/gtm";
import idea, {
  addIdea,
  removeIdea,
  replaceAllIdeas,
  toggleLoading,
  updateIdea,
} from "../../redux/slices/idea";
import { auth } from "../../services/firebaseconfig";
import service from "../../services/firebaseservice";

const Ideas = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [filter, setFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const ideas = useSelector((state) => state.ideas.ideas);
  const loadingIdeas = useSelector((state) => state.ideas.loading);

  const filteredIdeas = useMemo(
    () =>
      ideas
        ?.filter(
          (idea) =>
            filter === "all" ||
            idea.status === filter ||
            (filter === "active" && !idea.status)
        )
        .filter(
          (idea) => keyword.length === 0 || idea.title.includes(keyword)
        ) || [],
    [filter, ideas, keyword]
  );

  const dispatch = useDispatch();

  const handleFilterChange = (evt) => {
    const filter = evt.currentTarget.dataset.filter;
    setFilter(filter || "all");

    gtm.ideas.triggerstatus(filter);
  };

  const handleKeywordChange = (evt) => {
    setKeyword(evt.target.value);
  };

  useEffect(() => {
    if (!ideas || ideas.length === 0) {
      dispatch(toggleLoading(true));
      service.idea
        .loadAll()
        .then((docs) => dispatch(replaceAllIdeas(docs)))
        .catch((err) => notifier.error(err, "failed to load data"))
        .finally(() => dispatch(toggleLoading(false)));
    } else {
    }

    return () => {};
  }, [dispatch]);

  const onRemove = (idea) => {
    if (idea.status === "active" || !idea.status) {
      const updated = { ...idea, status: "archived" };
      dispatch(updateIdea({ id: updated.id, data: updated }));
      service.idea
        .update(updated.id, updated)
        .catch((err) => notifier.error(err, "failed to archive Idea"));
    }

    if (idea.status === "archived") {
      dispatch(removeIdea({ id: idea.id }));
      service.idea
        .remove(idea.id)
        .catch((err) => notifier.error(err, "failed to remove Idea"));
    }
  };
  const onSubmitIdea = (data) => {
    const { title, description } = data;
    const idea = {
      id: v4(),
      title,
      description: description || "",
      repository: "",
      technologies: [],
      links: [],
    };
    dispatch(addIdea(idea));
    setModalVisibility(false);
    service.idea
      .add(idea.id, idea)
      .catch((err) => notifier.error(err, "failed to create idea"))
      .catch(() => dispatch(onRemove({ id: idea.id })));
  };

  const toggleAddIdea = () => {
    setModalVisibility((old) => !old);
  };
  return (
    <>
      <NextSeo noindex={true} />
      <MainLayout>
        <section id="ideas">
          <header>
            <article className="welcome">
              Hi {user?.displayName || "there"}, Welcome back ! 👋
            </article>

            <>
              <article className="tabs-item-wrapper">
                <span
                  className={`tabs-item ${
                    filter === "all" ? "tabs-item-selected" : ""
                  }`}
                  data-filter="all"
                  onClick={handleFilterChange}
                >
                  All
                </span>
                <span
                  className={`tabs-item ${
                    filter === "active" ? "tabs-item-selected" : ""
                  }`}
                  data-filter="active"
                  onClick={handleFilterChange}
                >
                  active
                </span>
                <span
                  className={`tabs-item ${
                    filter === "archived" ? "tabs-item-selected" : ""
                  }`}
                  data-filter="archived"
                  onClick={handleFilterChange}
                >
                  archived
                </span>
              </article>
            </>
            <button onClick={toggleAddIdea}>
              <Plus />
            </button>
            <input
              className="searchbar"
              type="text"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="Search by name or technologies ..."
            />
          </header>
          <hr style={{ opacity: ".2", margin: "0" }} />

          <section id="ideas-wrapper">
            {loadingIdeas && <span>loading ...</span>}
            {!loadingIdeas &&
              filteredIdeas.map((idea) => (
                <IdeaSummary key={idea.id} idea={idea} onRemove={onRemove} />
              ))}
          </section>
        </section>

        <CustomModal
          title="Create new idea"
          inputData={[
            {
              attr: "title",
              type: "text",
              placeholder: "What's your idea title",
              required: true,
            },
            {
              attr: "description",
              type: "text",
              placeholder: "Type a small description",
            },
          ]}
          visible={modalVisibility}
          onSubmit={onSubmitIdea}
          onCancel={toggleAddIdea}
        />
      </MainLayout>
    </>
  );
};

export default Ideas;
