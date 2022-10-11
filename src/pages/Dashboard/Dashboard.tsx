import ProjectList from '../../components/ProjectList/ProjectList';
import Topbar from '../../components/Topbar/Topbar';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <div className={styles.container}>
      <Topbar />
      <ProjectList />
    </div>
  );
}
