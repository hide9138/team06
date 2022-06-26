import styles from '../styles/components/modal.module.css';
import React from 'react'

const Modal = ({ isOpen, handleClose, content }) => {
  if (!isOpen) {
    return <></>
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={`${styles.content} ${!isOpen && styles.content__fadeout}`} onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  )
}

export default Modal