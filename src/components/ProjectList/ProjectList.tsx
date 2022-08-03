import styles from './ProjectList.module.css';
import { Projects } from '../../utils/types';
import { Box, Button, Heading, HStack, Input, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../utils/queries';

export default function ProjectList() {
  const { data, loading, error } = useQuery(GET_PROJECTS, {
    returnPartialData: true,
  });
  console.log(data);
  console.log(error);

  return (
    <div className={styles.container}>
      <Heading className={styles.heading} size="md" textAlign="center">
        Projects
      </Heading>
      <div className={styles.contentWrapper}>
        <HStack className={styles.searchWrapper}>
          <Box
            as={Button}
            backgroundColor="#0094e8"
            _hover={{ backgroundColor: '#0000ff' }}
            borderRadius="12px"
            color="white"
            className={styles.addButton}
          >
            <AddIcon />
          </Box>
          <Input placeholder="Search" />
        </HStack>
        {loading ? (
          <Spinner />
        ) : (
          data?.projects.map((project: Projects, i: number) => (
            <div key={i}>{project.title}</div>
          ))
        )}
      </div>
    </div>
  );
}
