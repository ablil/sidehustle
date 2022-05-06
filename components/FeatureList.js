import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import notifier from "../helpers/notifier";
import {
  addFeature,
  removeFeature,
  replaceAllFeatures,
  toggleFeatureLoading,
  updateFeature
} from "../redux/slices/feature";
import service from "../services/firebaseservice";
import Feature from "./Feature";

const Features = () => {
  const router = useRouter();
  const { id } = router.query;

  const features = useSelector((state) => state.features.features);
  const loading = useSelector((state) => state.features.loading);

  const dispatch = useDispatch();

  const [editable, setEditable] = useState();
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((old) => !old);
  };

  const toggleFeatureEdit = (evt) => {
    const id = evt.currentTarget.dataset.id;
    setEditable(id);
  };

  const handleSubmit = (feature) => {
    if (feature.id === "new") {
      const tocreate = { ...feature, id: v4() };
      service.feature
        .update(tocreate.id, id, tocreate)
        .then(() => dispatch(addFeature(tocreate)))
        .catch((err) => notifier.error(err, "failed to create feature"))
        .finally(() => setEditMode(false));
    } else {
      setEditable(undefined)
      service.feature
        .update(feature.id, id, feature)
        .then(() => dispatch(updateFeature(feature)))
        .catch((err) => notifier.error(err, "failed to update feature"))
        // .finally(() => setEditable(undefined));
    }
  };

  const handleRemove = (evt) => {
    const featureId = evt.currentTarget.dataset.id;
    if (featureId === "new") {
      setEditMode(false);
    } else {
      service.feature
        .remove(featureId, id)
        .then(() => dispatch(removeFeature(featureId)))
        .catch((err) => notifier.error(err, "failed to remove feature"));
    }
  };

  useEffect(() => {
    if (id) {
      toggleFeatureLoading(true);

      service.feature
        .loadAll(id)
        .then((features) => dispatch(replaceAllFeatures(features)))
        .catch((err) => notifier.error(err, "failed to load features"))
        .finally(() => dispatch(toggleFeatureLoading(false)));
    }
  }, [dispatch, features, id]);

  if (loading) return "Loading ...";
  else {
    return (
      <section>
        <header className="tab-content-header">
          <p>
            Keep track of your application feature, use this section when you
            are brainstorming, then convert them to backlog tasks
          </p>
        </header>

        <section>
          <article>
            {features?.map((feature) => (
              <Feature
                feature={feature}
                key={feature.id}
                editable={editable === feature.id}
                toggleEdit={toggleFeatureEdit}
                onRemove={handleRemove}
                handleSubmit={handleSubmit}
              />
            ))}
            {editMode && (
              <Feature
                feature={{ id: "new", content: "" }}
                editable={editMode}
                toggleEdit={toggleFeatureEdit}
                onRemove={handleRemove}
                handleSubmit={handleSubmit}
              />
            )}
          </article>
        </section>
        <footer className="add-new-item">
          <button onClick={toggleEditMode}>+ add new</button>
        </footer>
      </section>
    );
  }
};

export default Features;
