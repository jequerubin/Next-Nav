import React, { useState } from 'react';
import { FileNode } from './TreeContainer';
import {
  Box,
  Button,
  Icon,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { PiTrashFill } from 'react-icons/pi';

import { useVsCodeApi } from '../VsCodeApiContext';

type Props = {
  handlePostMessage: (filePath: string,
    command: string,
    setterFunc?: (string: string) => any) => void;
  icon: any;
  content: string;
  path: string;
};

const DetailsBox = ({ handlePostMessage, icon, content, path }: Props): JSX.Element => {
  const vscode = useVsCodeApi();
  const [confirm, setConfirm] = useState(false);

  return(
    <Box>
        {' '}
        <Flex gap="2">
          {' '}
          <Button
            bgColor="#010101"
            color="white"
            flexGrow="3"
            _hover={{ bg: 'white', textColor: 'black' }}
            leftIcon={<Icon as={icon} />}
            onClick={() => {
              handlePostMessage(path.concat("/", content), "open_file");
            }}
          >
            {' '}
            {content}
          </Button>
          {confirm === false ?
          <IconButton
            isRound={true}
            variant="solid"
            size="md"
            colorScheme="red"
            aria-label="Done"
            icon={<Icon as={PiTrashFill} />}
            onClick={() => setConfirm(true)}
          />
           :
          <Button
            size="md"
            colorScheme="red"
            onClick={(e) => {
              handlePostMessage(path.concat('/', content), 'deleteFile');
            }}
          >
            Confirm
          </Button>
          }
        </Flex>
      </Box>
  );
};

export default DetailsBox;