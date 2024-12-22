import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { getWorkspace, getWorkspaceData } from "../../services/workspace";
import Loading from "../../components/common/Loading";
import { Folder } from "../../assets/Folder";
import { useApp } from "../../context/AppContext";
import { remove } from "../../assets/index";

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currDashboard, setCurrDashboard] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currFolder, setCurrFolder] = useState();
  const [forms, setForms] = useState([]);
  const { isDark } = useApp();

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

  function getUserData() {
    if (currDashboard) {
      getWorkspaceData(currDashboard._id).then((data) => {
        if (data) {
          setUserData(data);
          const defaultFolder = data.folders.find((folder) => {
            return folder.name === data.owner;
          });
          setCurrFolder(defaultFolder._id);
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
          />
          <div className={styles.dashboard}>
            <div>
              <div className={styles.folder}>
                <Folder
                  color={
                    isDark ? "rgba(255, 255, 255, 0.92)" : "rgba(0, 0, 0, 0.92)"
                  }
                />
                Create a folder
              </div>
              {userData &&
                userData.folders?.map((folder) => {
                  return (
                    userData.owner !== folder.name && (
                      <div
                        key={folder._id}
                        className={`${styles.folder} ` +
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
                        <img src={remove} />
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
