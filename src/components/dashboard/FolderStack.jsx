import React, { useState } from "react";
import { Folder } from "../../assets/Folder";
import styles from "./FolderStack.module.css";
import NewItemModal from "./NewItemModal";
import { useApp } from "../../context/AppContext";
import DeletePopup from "./DeletePopup";
import { createFolder, deleteFolder } from "../../services/workspace";
import notify from "../../utils/notify";

export default function FolderStack({
  collection,
  handleFolder,
  currFolder,
  isEditor,
  reload,
}) {
  const { isDark } = useApp();
  const iconColor = isDark
    ? "rgba(255, 255, 255, 0.92)"
    : "rgba(0, 0, 0, 0.92)";

  const handleNewFolder = async (name) => {
    const newFolder = {
      workspace: collection._id,
      foldername: name.trim(),
    };
    const res = await createFolder(newFolder);
    if (res.status === 201) {
      reload();
      notify("Folder created", "success");
      return true;
    }
    if (res.status === 400) {
      return res.data.message;
    }
    notify("Something went wrong", "error");
    return false;
  };

  const handleDeleteFolder = async (id) => {
    const res = await deleteFolder(collection._id, id);
    console.log(res);
    if (res.status === 201) {
      reload();
      notify("Folder deleted", "success");
      return true;
    }
  };

  return (
    <div className={styles.container}>
      {isEditor && (
        <NewItemModal
          ele={
            <div className={styles.folder}>
              <Folder color={iconColor} />
              Create a folder
            </div>
          }
          item={"Folder"}
          handleNew={handleNewFolder}
        />
      )}
      {collection?.folders?.map((folder) => {
        const isSelected = currFolder === folder._id;
        const isDefault = collection.owner === folder.name;
        return (
          !isDefault && (
            <div
              key={folder._id}
              className={`${styles.folder} ` + (isSelected && styles.selection)}
            >
              <p onClick={() => handleFolder(folder._id)}>{folder.name}</p>
              {isEditor && (
                <DeletePopup
                  isDark={isDark}
                  item={"folder"}
                  handleDelete={() => handleDeleteFolder(folder._id)}
                />
              )}
            </div>
          )
        );
      })}
    </div>
  );
}
