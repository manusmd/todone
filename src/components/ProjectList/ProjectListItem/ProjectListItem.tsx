import styles from './ProjectListItem.module.css';
import { AiFillDelete } from 'react-icons/ai';

type ProjectListItemProps = {
  title: string;
  todoCount: number;
  onclick: () => void;
  deleteHandler: () => void;
};

export default function ProjectListItem({
  title,
  todoCount,
  onclick,
  deleteHandler,
}: ProjectListItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.projectWrapper} onClick={onclick}>
        <span className={styles.title}>{title}</span>
        <span className={styles.counter}>Tasks: {todoCount}</span>
      </div>
      <AiFillDelete
        className={styles.delete}
        color="#ff4444b7"
        size={'25'}
        onClick={deleteHandler}
      />
    </div>
  );
}
