import React from 'react';
import { FileNode } from './TreeContainer';
import { Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';

  type Props = {
    obj: FileNode;
  };

  export default function FileAddModal(): JSX.Element {
    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    );
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);
  
    return (
      <>
        <Button
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        >
            +
        </Button>
       
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Add Folder</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>File Name:</Text>
              <input id='fileName' type='text'></input>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }