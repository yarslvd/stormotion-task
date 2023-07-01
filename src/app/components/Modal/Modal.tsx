import styles from './Modal.module.scss';

interface Props {
    children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.modal}>
        <h2>Modal Window</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.action}>
          <button className={styles.button}>
            close
          </button>
        </div>
    </div>
  )
}

export default Modal;