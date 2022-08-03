import styles from './ProjectList.module.css';
import { Projects } from '../../utils/types';
import { Box, Button, Heading, HStack, Input, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../utils/queries';
import { useEffect } from 'react';
import ProjectListItem from './ProjectListItem/ProjectListItem';

export default function ProjectList() {
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS);

  useEffect(() => {
    refetch();
  });

  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Oops, something went wrong!</p>;
  }

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
            <ProjectListItem
              key={i}
              title={project.title}
              todoCount={project.todos.length}
            />
          ))
        )}
      </div>
    </div>
  );
}
