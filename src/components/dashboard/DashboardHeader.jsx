import React from 'react';
import styles from './DashboardHeader.module.css';
import Toggle from '../common/Toggle';

export default function DashboardHeader() {
  return (
    <div className={styles.container}>
        <div className={styles.workspace}>User's workspace</div>
        <Toggle />
        <button className={styles.share}>Share</button>
    </div>
  )
}
