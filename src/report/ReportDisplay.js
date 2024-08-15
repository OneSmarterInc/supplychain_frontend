import React from 'react';
import { Button, VStack, Box } from '@chakra-ui/react';

const ReportDisplay = ({ reportData, onClose }) => {
  return (
    <VStack spacing={4} align="stretch" width="100%">
      <Button alignSelf="flex-end" onClick={onClose}>
        Close
      </Button>
      <Box p={4} borderWidth="1px" borderRadius="lg">
        {/* Render report data here */}
        <pre>{JSON.stringify(reportData, null, 2)}</pre>
      </Box>
    </VStack>
  );
};

export default ReportDisplay;