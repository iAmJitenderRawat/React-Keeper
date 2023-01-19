import { Spinner, Box, Heading } from "@chakra-ui/react";
import React from "react";

export const Loading = () => {
  return (
    <Box className="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="yellow.400"
        size="xl"
      />
      <Heading color="yellow.400">Loading...</Heading>
    </Box>
  );
};
