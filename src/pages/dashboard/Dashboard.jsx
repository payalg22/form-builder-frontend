import React from 'react';
import styles from './Dashboard.module.css';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

export default function Dashboard() {
  return (
    <div className={styles.container}>
        <DashboardHeader />
    </div>
  )
}
