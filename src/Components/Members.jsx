import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MyContext from '../Components/ContextApi/MyContext';
import { Puff } from 'react-loader-spinner';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Image, Heading, Center, Spinner, Text } from '@chakra-ui/react';
import UserLoggerApi from '../LoggerApis/UserLoggerApi';

const Members = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { api, api1 } = useContext(MyContext);
  
  const selectedCourse = JSON.parse(localStorage.getItem('selectedSimData')) || {};
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  const firm_obj = selectedCourse[0]?.firm_data?.filter(item => item.emails.includes(user.email)) || [];
  const firm_key_new = firm_obj.length ? firm_obj[0].firmName : '';

  useEffect(() => {
    const fetchUsers = async () => {
      if (!selectedCourse[0]?.passcode) return;

      try {
        setLoading(true);
        const response = await axios.get(`${api}/get-firms/${selectedCourse[0].passcode}/`);
        const flattenedUsers = response.data.flatMap((firm) => {
          const firmUsers = Array.isArray(firm.users) ? firm.users : [];
          return firmUsers
            .filter((u) => firm.firm_key === firm_key_new) // Only include users from the same firm
            .map((user) => ({
              name: `${user.first_name} ${user.last_name}`,
              id: `#${user.user_id}`,
              email: user.email,
              team: firm.firm_key,
              department: user.department,
              course: user.course,
              university: user.university,
              image: user.image, // Include user image
            }));
        });
        setUsers(flattenedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [api, firm_key_new]);

  return (
    <Box p={4} maxW="100%" overflowX="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Members in Your Team
      </Heading>
      {loading ? (
        <Center>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        <Table variant="striped" colorScheme="white" size="sm" overflowX="auto">
          <Thead>
            <Tr>
             
              <Th></Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Team</Th>
              <Th>Department</Th>
              <Th>Course</Th>
              <Th>University</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={index}>
            
                <Td>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={`${api1}${user.image}`}
                    alt={`${user.name}'s avatar`}
                  />
                </Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.team}</Td>
                <Td>{user.department}</Td>
                <Td>{user.course}</Td>
                <Td>{user.university}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      
      {/* <Text textAlign={'center'}>Decision Logs</Text> */}
       <div className='pt-4'>
       <UserLoggerApi
              simulation_id={selectedCourse[0].simulation_id}
              firm_key={firm_key_new}
              current_quarter={selectedCourse[0].current_quarter}
            />
      </div>

      {/* <SlantedSection /> */}
    </Box>
  );
};

export default Members;