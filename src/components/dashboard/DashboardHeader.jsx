import React, { useEffect, useRef, useState } from "react";
import styles from "./DashboardHeader.module.css";
import Toggle from "../common/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../utils/session";
import { useNavigate } from "react-router-dom";
import ShareModal from "./ShareModal";

export default function DashboardHeader({
  workspaces,
  handleSelect,
  curr,
  isOwner,
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [wkspcList, setWkspcList] = useState();

  useEffect(() => {
    //reorganise menu
    const list = [curr];
    const rest = workspaces
      ? workspaces.filter((user) => user._id !== curr._id)
      : [];
    list.push(...rest);
    setWkspcList(list);
  }, [curr]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, []);

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleSelectUser = (user) => {
    if (user._id !== curr._id) {
      handleSelect(user);
      setIsOpenMenu(false);
    }
  };

  function handleClickOut(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpenMenu(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.workspace}>
          <div>
            {`${curr?.owner.name}'s workspace`}
            <FontAwesomeIcon
              icon={faAngleDown}
              onClick={handleMenu}
              className={styles.icon}
            />
          </div>
          {isOpenMenu && (
            <div className={styles.menu} ref={menuRef}>
              {wkspcList.map((user, idx) => {
                return (
                  <div key={user._id} onClick={() => handleSelectUser(user)}>
                    {`${user.owner.name}'s workspace`}
                    {idx === 0 && (
                      <FontAwesomeIcon
                        icon={faAngleUp}
                        onClick={handleMenu}
                        className={styles.icon}
                      />
                    )}
                  </div>
                );
              })}
              <p onClick={() => navigate("/settings")}>Settings</p>
              <p className={styles.logout} onClick={logout}>
                Logout
              </p>
            </div>
          )}
        </div>
        <Toggle />
        {isOwner && (
          <ShareModal
            ele={<button className={styles.share}>Share</button>}
            id={curr._id}
          />
        )}
      </div>
    </div>
  );
}
