import BtnUpdate from '../BtnUpdate/BtnUpdate';
import { BtnDelete } from '../BtnDelete/BtnDelete';
import { HStack, Stack, VStack, Text, StackDivider, Button, Checkbox } from '@chakra-ui/react';
import { ITab } from '../../interfaces/Tab';
import { IState, ITask, ITasks } from '../../interfaces/Task';
import FormAdd from '../FormAdd/FormAdd';
import { useSelector, useDispatch } from 'react-redux';
import { updateTab } from '../../slices/TabSlice';
import { toggleComplete } from '../../slices/TaskSlice';
import styles from './style.module.css';

function List() {
  const dispatch = useDispatch();
  const tab = useSelector((state: ITab) => state.tabWatch.tab);
  const tasks = useSelector((state: IState) => state.tasksWatch.tasks);

  function filterTasks(): ITasks {
    return tasks
      .filter((task) => {
        switch (tab) {
          case 'progress':
            return !task.complete;
          case 'completed':
            return task.complete;
        }
      })
      .sort((task) => (task.complete ? 1 : -1));
  }

  const myTask = (task: ITask) => {
    const op: string = task.complete ? '0.2' : '1';
    const as: any = task.complete ? 'del' : '';

    return (
      <HStack key={task.id} opacity={op}>
        <Checkbox colorScheme='green' defaultChecked={task.complete} onChange={() => dispatch(toggleComplete(task))} />
        <Text w='100%' p='8px' as={as} borderRadius='lg'>
          {task.description}
        </Text>
        <BtnDelete task={task} />
        <BtnUpdate task={task} />
      </HStack>
    );
  };

  if (!filterTasks().length) {
    return (
      <>
        <FormAdd />
        <Stack spacing={2} direction='row' align='center'>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                colorScheme='purple'
                size='xs'
                onClick={() => dispatch(updateTab('progress'))}
                isActive={tab === 'progress'}
                variant='outline'
              >
                In progress
              </Button>
            </div>
            <div className={styles.button}>
              <Button
                colorScheme='green'
                size='xs'
                onClick={() => dispatch(updateTab('completed'))}
                isActive={tab === 'completed'}
                variant='outline'
              >
                Completed
              </Button>
            </div>
          </div>
        </Stack>
      </>
    );
  }
  return (
    <>
      <FormAdd />
      <Stack spacing={2} direction='row' align='center'>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <Button
              colorScheme='purple'
              size='xs'
              onClick={() => dispatch(updateTab('progress'))}
              isActive={tab === 'progress'}
              variant='outline'
            >
              In progress
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              colorScheme='green'
              size='xs'
              onClick={() => dispatch(updateTab('completed'))}
              isActive={tab === 'completed'}
              variant='outline'
            >
              Completed
            </Button>
          </div>
        </div>
      </Stack>
      <VStack
        divider={<StackDivider />}
        borderColor='gray.100'
        borderWidth='2px'
        p='5'
        borderRadius='lg'
        w='100%'
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        alignItems='stretch'
      >
        {filterTasks().map(myTask)}
      </VStack>
    </>
  );
}

export default List;
