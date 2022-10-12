import { IBtnDelete } from '../../interfaces/Task';
import { deleteTask } from '../../slices/TaskSlice';
import { useDispatch } from 'react-redux';
import styles from './style.module.css';

function BtnDelete({ task }: IBtnDelete) {
  const dispatch = useDispatch();

  return (
    <div>
      <button className={styles.button} type='button' onClick={() => dispatch(deleteTask(task))}>
        Delete
      </button>
    </div>
  );
}

export { BtnDelete };
