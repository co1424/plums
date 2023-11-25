import React from 'react';
import { Flowbite, Modal } from 'flowbite-react';
import CardModal from '@/app/components/ModalNote';
import CardModal from '@/components/ModalEditNote';

const AddNewTopic = () => {
  return (
    <div>
      <h1>Create New Topic</h1>
      <Flowbite>
        <CardModal />
      </Flowbite>
    </div>
  );
};

export default AddNewTopic;
