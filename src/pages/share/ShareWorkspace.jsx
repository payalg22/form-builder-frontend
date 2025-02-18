import React, { useEffect } from "react";
import Loading from "../../components/common/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { shareWorkspace } from "../../services/workspace";
import notify from "../../utils/notify";
import { isLoggedUser } from "../../utils/session";

export default function ShareWorkspace() {
  const { id, role } = useParams();
  const navigate = useNavigate();
  const { user, isLoading } = useApp();
  let isToastDisplayed = false;

  useEffect(() => {
    if (!isLoggedUser()) {
        isToastDisplayed = true;
        notify("Please login to continue", "warn");
        navigate(`/login/${id}/${role}`);
    } else if (user && !isLoading) {
      const data = {
        email: user.email,
        isEditor: role,
      };
      shareWorkspace(id, data).then((res) => {
        if (!isToastDisplayed) {
          isToastDisplayed = true;
          if (res.status === 200) {
            notify("Workspace added", "success");
          } else if (res.status === 400) {
            notify("Workspace already added", "info");
          } else {
            notify("Something went wrong", "error");
          }
          navigate("/dashboard");
        }
      });
    }
  }, [user]);

  return (
    <div style={{ margin: "auto" }}>
      <Loading />
    </div>
  );
}
