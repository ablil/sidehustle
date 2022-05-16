import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import notifier from "../helpers/notifier";
import {
  addBacklog,
  removeBacklog,
  replaceAllBacklogs,
  toggleBacklogLoading,
  updateBacklog,
} from "../redux/slices/backlog";
import service from "../services/firebaseservice";
import Backlog from "./Backlog";
import CustomModal from "./common/CustomModal";
import Loading from "./icons/Loading";

const BacklogList = ({ keyword }) => {
  const router = useRouter();
  const { id } = router.query;

  const backlogs = useSelector((state) => state.backlogs.backlogs);
  const loading = useSelector((state) => state.backlogs.loading);
  const dispatch = useDispatch();

  const [isModalVisibile, setIsModalVisible] = useState(false);

  const [selected, setSelected] = useState({
    editable: undefined,
  });

  const [filters, setFilters] = useState({
    status: "ALL",
    sort: {
      by: "title",
      order: "asec",
    },
  });
  const filteredIdeas = useMemo(() => {
    return backlogs
      ?.filter(
        (item) => filters.status === "ALL" || filters.status === item.status
      )
      .filter((item) =>
        keyword.length > 0
          ? item.title.includes(keyword) || item.content.includes(keyword)
          : true
      )
      .sort((a, b) => (a.title > b.title ? 1 : a.title === b.title ? 0 : -1))
      .sort((first, second) => {
        if (filters.sort.by === "date") {
          const firstDate = (
            first.lastModifier?.toDate() || new Date()
          ).getTime();
          const secondDate = (
            second.lastModified?.toDate() || new Date()
          ).getTime();

          return firstDate > secondDate ? 1 : -1;
        }

        if (filters.sort.by === "status") {
          if (first.status === second.status) return 0;
          else return first.status > second.status ? -1 : 1;
        }
        return 1;
      })
      .sort((a, b) => (filters.sort.order === "asec" ? 1 : -1));
  }, [backlogs, filters, keyword]);

  const toggleEditMode = (id) => {
    setSelected((old) => ({
      editable: old.editable === id ? undefined : id,
    }));
  };

  const toggleModal = () => {
    setIsModalVisible((old) => !old);
  };

  const handleRemoveBacklog = (backlog) => {
    dispatch(removeBacklog(backlog));
    toggleBacklogLoading(backlog.id);
    service.backlog
      .remove(backlog.id, id)
      .catch((err) => notifier.error(err, "failed to remove backlog"))
      .catch(() => dispatch(addBacklog(backlog)));
  };

  const saveBacklog = (backlog) => {
    dispatch(updateBacklog(backlog));
    toggleBacklogLoading(backlog.id);
    toggleEditMode(backlog.id);

    service.backlog
      .update(backlog.id, id, backlog)
      .catch((err) => notifier.error(err, "failed to update backlog"));
  };

  const handleAddBacklogSubmit = ({ title, content }) => {
    const backlog = { id: v4(), title, content: content || "", status: "OPEN" };

    dispatch(addBacklog(backlog));
    toggleModal();

    service.backlog
      .add(backlog.id, id, backlog)
      .catch((err) => notifier.error(err, "failed to create backlog"))
      .catch(() => dispatch(handleRemoveBacklog(backlog)));
  };

  useEffect(() => {
    if (id) {
      dispatch(toggleBacklogLoading(true));
      service.backlog
        .loadAll(id)
        .then((backlogs) => dispatch(replaceAllBacklogs(backlogs)))
        .catch((err) => notifier.error(err, "failed to load backlog"))
        .finally(() => dispatch(toggleBacklogLoading(false)));
    }
  }, [id, dispatch]);

  const handleFilterChange = (evt) => {
    const attr = evt.currentTarget.dataset.attr;
    const value = evt.target.value;

    if (attr) {
      if (attr === "status") setFilters((old) => ({ ...old, [attr]: value }));
      else
        setFilters((old) => ({ ...old, sort: { ...old.sort, [attr]: value } }));
    }
  };

  if (loading) return null;
  return (
    <section>
      <header className="tab-content-header">
        <p>
          A roadmap to keep track of your progress on the idea, what you have
          done & what are you gonna do next.
        </p>
      </header>

      <section id="backlog-filters">
        <button onClick={toggleModal}>add new backlog</button>
        <article className="filter">
          <label>status</label>
          <select
            value={filters.status}
            data-attr="status"
            onChange={handleFilterChange}
          >
            <option value="ALL">all (default)</option>
            <option value="OPEN">Open</option>
            <option value="INPROGRESS">in progress</option>
            <option value="DONE">done</option>
          </select>
        </article>
        <article className="filter">
          <label>sort</label>
          <select
            value={filters.sort.by}
            data-attr="by"
            onChange={handleFilterChange}
          >
            <option value="title">Title (default)</option>
            <option value="date">Modification</option>
            <option value="status">status</option>
          </select>
          <select
            value={filters.sort.order}
            data-attr="order"
            onChange={handleFilterChange}
          >
            <option value="asec">asec (default)</option>
            <option value="desc">desc</option>
          </select>
        </article>
      </section>

      <section>
        {filteredIdeas?.map((d) => (
          <Backlog
            backlog={d}
            key={d.id}
            editable={selected.editable === d.id}
            toggleEdit={toggleEditMode}
            onRemove={handleRemoveBacklog}
            onSave={saveBacklog}
          />
        ))}
      </section>

      <CustomModal
        title="Create new backlog item"
        inputData={[{ attr: "title", required: true }, { attr: "content" }]}
        visible={isModalVisibile}
        onCancel={toggleModal}
        onSubmit={handleAddBacklogSubmit}
      />
    </section>
  );
};

export default BacklogList;
