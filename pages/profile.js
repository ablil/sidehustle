import { Tabs } from "antd";
import { NextSeo } from "next-seo";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { StickyContainer } from "react-sticky";
import MainLayout from "../components/layouts/MainLayout";
import notifier from "../helpers/notifier";
import gtm from "../lib/gtm";
import { auth } from "../services/firebaseconfig";
import firebaseservice from "../services/firebaseservice";

const Profile = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [files, setFiles] = useState([]);

  const [data, setData] = useState({
    username: "",
    old: "",
    newpassword: "",
    retypepassword: "",
  });

  const isChangePasswordDisabled = useMemo(
    () =>
      data.old.length === 0 ||
      data.newpassword.length === 0 ||
      data.retypepassword.length === 0,
    [data.newpassword.length, data.old.length, data.retypepassword.length]
  );

  const doesPasswordMatch = useMemo(
    () => data.newpassword === data.retypepassword,
    [data.newpassword, data.retypepassword]
  );

  const doesUpdateInfoFormDisabeld = useMemo(
    () => data.username.length === 0 || data.username === user?.displayName,
    [data, user]
  );

  const handleChange = (evt) => {
    const attr = evt.currentTarget.dataset.attr;
    setData((old) => ({ ...old, [attr]: evt.target.value }));
  };

  useEffect(() => {
    if (user) setData((old) => ({ ...old, username: user.displayName }));

    return () => {};
  }, [user]);

  const updateUsername = (evt) => {
    evt.preventDefault();
    const username = data.username;

    if (username) {
      firebaseservice.profile
        .updateUsername(auth.currentUser, username)
        .then(() => setData((old) => ({ ...old, username: "" })))
        .catch((err) => notifier.error(err, "failed to update username"));
    }
  };

  const changePassword = async () => {
    try {
      firebaseservice.profile.changePassword(user, data.old, data.newpassword);
      signOut(auth);
      router.push("/login");
    } catch (error) {
      notifier.error(error, "failed to change password");
    }
  };

  const sendVerificationEmail = () => {
    firebaseservice.profile
      .sendVerificationEmail(auth.currentUser)
      .then(() => notifier.success("email sent"))
      .catch((err) =>
        notifier.error(err, "failed to send email, try again !!")
      );
  };

  const handleFileChange = (evt) => {
    const files = evt.target.files;

    if (files && files.length) {
      setFiles((old) => old.concat(Array.from(files)));
    }

    gtm.profile.updatepicture();
  };

  const isFileValid = (file) => {
    return file && file.size < 1024 * 5;
  };
  const handleUpdateProfile = async (evt) => {
    evt.preventDefault();

    const file = files[0];
    if (file) {
      try {
        const uploadResult = await firebaseservice.profile.uploadProfilePicture(
          user.uid,
          file,
          "filename.jpg"
        );
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${uploadResult.metadata.bucket}/o/${uploadResult.metadata.fullPath}?alt=media`;
        const updateResult = await firebaseservice.profile.updateProfilePicture(
          auth.currentUser,
          publicUrl
        );
      } catch (e) {
        notifier.error(e, "failed to update profile picture");
      }
    }
  };

  const onTabChange = (key) => {
    gtm.profile.selecttab(key == 1 ? "username" : "password");
  };

  return (
    <>
      <NextSeo title="Profile" />
      <MainLayout>
        <div id="profile">
          <form className="profile-header" onSubmit={handleUpdateProfile}>
            <label htmlFor="profile-picture" title="click to upload ">
              {user?.photoURL ? (
                <img
                  className="profile-picture"
                  src={user.photoURL}
                  width={200}
                  height="auto"
                />
              ) : (
                <Image
                  className="profile-picture"
                  src="/icons/default-profile-pictures.png"
                  height={200}
                  width={200}
                  alt="change pictuer"
                />
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-picture"
              onChange={handleFileChange}
              style={{
                display: "none",
              }}
            />
            <h2>
              <span style={{ marginLeft: "1rem" }}>{user?.email}</span>
              {!user?.emailVerified && (
                <>
                  <small className="profile-status">not verified</small>
                  <button
                    onClick={sendVerificationEmail}
                    className="verification-email"
                  >
                    send verification email
                  </button>
                </>
              )}
            </h2>
            {files && files.length > 0 && (
              <button type="submit" style={{ marginBottom: "1rem" }}>
                upload
              </button>
            )}
          </form>

          <StickyContainer>
            <Tabs defaultActiveKey="1" onChange={onTabChange} centered>
              <Tabs.TabPane tab="change username" key="1">
                <form className="profile-form" onSubmit={updateUsername}>
                  <article>
                    <label>email (un-editable)</label>
                    <input type="email" value={user?.email} disabled />
                  </article>
                  <article>
                    <label>username</label>
                    <input
                      type="text"
                      placeholder="@username"
                      data-attr="username"
                      value={data.username}
                      onChange={handleChange}
                    />
                  </article>
                  <footer>
                    <button type="submit" disabled={doesUpdateInfoFormDisabeld}>
                      update
                    </button>
                  </footer>
                </form>
              </Tabs.TabPane>
              <Tabs.TabPane tab="change password" key="2">
                <section className="profile-form">
                  <article>
                    <label>old password</label>
                    <input
                      type="password"
                      placeholder="**************"
                      data-attr="old"
                      value={data.old}
                      onChange={handleChange}
                    />
                  </article>
                  <article>
                    <label>new password</label>
                    <input
                      type="password"
                      placeholder="**************"
                      data-attr="newpassword"
                      onChange={handleChange}
                    />
                  </article>
                  <article>
                    <label>new password again</label>
                    <input
                      type="password"
                      placeholder="**************"
                      data-attr="retypepassword"
                      value={data.retypepassword}
                      onChange={handleChange}
                    />
                  </article>

                  <article>
                    {!doesPasswordMatch && (
                      <span className="invalidpassword">Do NOT match!</span>
                    )}
                  </article>
                  <button
                    disabled={isChangePasswordDisabled}
                    onClick={changePassword}
                  >
                    change password
                  </button>
                </section>
              </Tabs.TabPane>
            </Tabs>
          </StickyContainer>

          <footer>
            <article>
              <span>created</span>
              <strong>{user?.metadata?.creationTime}</strong>
            </article>
            <article>
              <span>last login</span>
              <strong>{user?.metadata?.lastSignInTime}</strong>
            </article>
          </footer>
        </div>
      </MainLayout>
    </>
  );
};

export default Profile;
