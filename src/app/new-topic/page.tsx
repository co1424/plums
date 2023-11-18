import React from 'react';
import { Flowbite, Modal } from 'flowbite-react';
import CardModal from '@/components/ModalNote';

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
