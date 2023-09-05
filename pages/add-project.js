import AddProjectForm from "../components/AddProjectForm";
import styles from "../styles/Home.module.css";

export default function AddProject() {
  return (
    <div className="container p-3 vh-100">
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h2>Pro Manage AI</h2>
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}
