import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { getWorkspace, getWorkspaceData } from "../../services/workspace";
import Loading from "../../components/common/Loading";
import { useApp } from "../../context/AppContext";
import FolderStack from "../../components/dashboard/FolderStack";
import FormStack from "../../components/dashboard/FormStack";

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState("");
  const [currDashboard, setCurrDashboard] = useState(null);
  const [collection, setCollection] = useState(null);
  const [currFolder, setCurrFolder] = useState();
  const [forms, setForms] = useState([]);
  const { user, isLoading, setIsLoading } = useApp();
  const [isAuthorised, setIsAuthorised] = useState({
    owner: false,
    editor: false,
  });

  //Get all the workspaces, user has access to
  useEffect(() => {
    getWorkspace().then((data) => {
      if (data) {
        setWorkspaces(data);
        if (user) {
          const currDash = data.find((wkspc) => wkspc.owner._id === user._id);
          setCurrDashboard(currDash);
          setIsLoading(false);
        }
      }
    });
  }, [user]);

  useEffect(getCollection, [currDashboard]);

  const selectWorkspace = (user) => {
    setCurrDashboard(user);
  };

  const handleFolder = (id) => {
    setCurrFolder(id);
  };

  //Check what privileges does the user have
  function checkAuthority(data) {
    if (user._id === data.owner) {
      setIsAuthorised({ owner: true, editor: true });
    } else {
      const isEditor = data.sharedTo[0].isEditor;
      setIsAuthorised({ owner: false, editor: isEditor });
    }
  }

  //To get all the folders associated with user/ selected workspace
  function getCollection() {
    if (currDashboard) {
      getWorkspaceData(currDashboard._id).then((data) => {
        if (data) {
          setCollection(data);
          const defaultFolder = data.folders.find((folder) => {
            return folder.name === data.owner;
          });
          setCurrFolder(defaultFolder._id);
          checkAuthority(data);
        }
      });
    }
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.main}>
          <DashboardHeader
            workspaces={workspaces}
            handleSelect={selectWorkspace}
            curr={currDashboard}
            isOwner={isAuthorised.owner}
          />
          <div className={styles.dashboard}>
            <FolderStack
              collection={collection}
              handleFolder={handleFolder}
              currFolder={currFolder}
              isEditor={isAuthorised.editor}
              reload={getCollection}
            />
            <FormStack isEditor={isAuthorised.editor} />
          </div>
        </div>
      )}
    </div>
  );
}
