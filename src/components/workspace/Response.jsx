import React, { useEffect, useState } from "react";
import { getFormResponses } from "../../services/response";
import Loading from "../common/Loading";
import styles from "./Response.module.css";
import ResTable from "./ResTable";
import { PieChart } from "react-minimal-pie-chart";

export default function Response({ form }) {
  const [isLoading, setIsLoading] = useState(true);
  const [responses, setResponses] = useState(null);
  const [analytics, setAnalytics] = useState({
    starts: "",
    views: "",
  });
  const [completed, setCompleted] = useState();
  const compPer = (completed / analytics.starts) * 100;
  const fields = form?.fields;

  useEffect(() => {
    getFormResponses(form._id)
      .then((data) => {
        if (data.starts) {
          setAnalytics({
            starts: data.starts,
            views: form.views,
          });
          setResponses(data.responses);
          setCompleted(data.completed);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.outer}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {!responses ? (
            <div className={styles.noresponse}>No Response yet collected</div>
          ) : (
            <div className={styles.main}>
              <div className={styles.analytics}>
                {Object.keys(analytics).map((item, idx) => {
                  return (
                    <div key={idx} className={styles.stats}>
                      <p>{`${item.charAt(0).toUpperCase()}${item.slice(1)}`}</p>
                      <p>{analytics[item]}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.responses}>
                <ResTable fields={fields} responses={responses} />
              </div>
              <div className={styles.analytics}>
              <div className={styles.piechart}>
                <PieChart
                  data={[
                    { title: "Completed", value: compPer, color: "rgba(59, 130, 246, 1)" },
                    { title: "Start", value: 100 - compPer, color: "rgba(144, 144, 144, 1)" },
                  ]}
                  startAngle={270}
                  lineWidth={30}
                  totalValue={100}
                  background="rgba(255, 255, 255, 1)"
                  radius={50}
                  paddingAngle={1}
                  segmentsStyle={{strokeWidth: 14}}
                />
                <span><p>Completed</p><p>{compPer}</p></span>
                </div>
                <div className={styles.stats}>
                  <p>Completed</p>
                  {`${compPer} %`}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
