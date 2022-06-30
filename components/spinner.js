import styles from '../styles/components/spinner.module.css';
import React from 'react'

const Spinner = ({ loading }) => {
  if (!loading) {
    return <></>
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
      </div>
    </div>
  )
}

export default Spinner