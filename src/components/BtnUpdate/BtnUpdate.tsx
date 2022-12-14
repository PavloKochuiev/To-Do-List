import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormControl,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react';
import { ITask, IBtnUpdate } from '../../interfaces/Task';
import { updateTask } from '../../slices/TaskSlice';
import { useDispatch } from 'react-redux';
import styles from './style.module.css';

function BtnUpdate({ task }: IBtnUpdate) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTask, setNew] = useState<ITask>(task);

  const initialRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleTask(e: React.ChangeEvent<HTMLInputElement>) {
    setNew({ ...newTask, description: e.target.value });
  }

  function upTask() {
    const info = task.description.trim();

    if (!info) {
      toast({
        title: 'Enter your task',
        position: 'top',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    dispatch(updateTask(newTask));
    onClose();
  }

  return (
    <>
      <button type='button' onClick={onOpen} hidden={task.complete}>
        Edit
      </button>
      <Modal isCentered initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalContent w='90%'>
          <p className={styles.title}>Update your task </p>
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder='Enter your task'
                defaultValue={newTask.description}
                onChange={handleTask}
                onFocus={handleTask}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={() => upTask()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BtnUpdate;
