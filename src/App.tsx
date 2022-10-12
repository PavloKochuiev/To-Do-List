import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import List from './components/List/List';
import { store } from './app/store';
import styles from './App.module.css';

const App: React.FC = () => {
  store.subscribe(() => {
    localStorage.setItem('tasks', JSON.stringify(store.getState().tasksWatch.tasks));
    localStorage.setItem('tab', store.getState().tabWatch.tab);
  });

  return (
    <div className={styles.container}>
      <div className={styles.general}>
        <h1 className={styles.title}>To-Do List</h1>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/list' element={<List />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
