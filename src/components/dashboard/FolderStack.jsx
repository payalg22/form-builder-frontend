import React, { forwardRef } from "react";
import { Folder } from "../../assets/Folder";
import { remove } from "../../assets/index";
import styles from "./FolderStack.module.css";
import NewItemModal from "./NewItemModal";
import { useApp } from "../../context/AppContext";

export default function FolderStack({
  userData,
  handleFolder,
  currFolder,
  isEditor,
}) {
  const { isDark } = useApp();
  const iconColor = isDark
    ? "rgba(255, 255, 255, 0.92)"
    : "rgba(0, 0, 0, 0.92)";
  return (
    <div>
      {isEditor && (
        <NewItemModal
        isDark={isDark}
          item={"Folder"}
          ele={
            <div className={styles.folder}>
              <Folder color={iconColor} />
              Create a folder
            </div>
          }
        />
      )}
      {userData &&
        userData.folders?.map((folder) => {
          return (
            userData.owner !== folder.name && (
              <div
                key={folder._id}
                className={
                  `${styles.folder} ` +
                  (currFolder === folder._id && styles.selection)
                }
              >
                <p
                  onClick={() => {
                    handleFolder(folder._id);
                  }}
                >
                  {folder.name}
                </p>
                {isEditor && <img src={remove} />}
              </div>
            )
          );
        })}
    </div>
  );
}
