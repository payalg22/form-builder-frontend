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
  const [userData, setUserData] = useState(null);
  const [currFolder, setCurrFolder] = useState();
  const [forms, setForms] = useState([]);
  const { isDark, user, isLoading, setIsLoading } = useApp();
  const [isAuthorised, setIsAuthorised] = useState({
    owner: false,
    editor: false,
  });

  //Get all the workspaces, user has access to
  useEffect(() => {
    getWorkspace()
      .then((data) => {
        if (data) {
          setWorkspaces(data);
          setCurrDashboard(data[0]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(getUserData, [currDashboard]);

  const selectWorkspace = (user) => {
    setCurrDashboard(user);
  };

  const handleFolder = (id) => {
    setCurrFolder(id);
  };

  //Check what privileges does the user have
  function checkAuthority(data) {
    console.log(user._id, data);
    if (user._id === data.owner) {
      setIsAuthorised({ owner: true, editor: true });
    } else {
      const isEditor = data.sharedTo[0].isEditor;
      setIsAuthorised({ owner: false, editor: isEditor });
    }
  }

  //To get all the folders associated with user/ selected workspace
  function getUserData() {
    if (currDashboard) {
      getWorkspaceData(currDashboard._id).then((data) => {
        if (data) {
          setUserData(data);
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
              userData={userData}
              handleFolder={handleFolder}
              currFolder={currFolder}
              isDark={isDark}
              isEditor={isAuthorised.editor}
            />
            <FormStack />
          </div>
        </div>
      )}
    </div>
  );
}
