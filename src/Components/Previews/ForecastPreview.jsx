import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ForecastPreview = ({
  ForecastHyperware,
  ForecastMetaware,
  toggleModal,
}) => {
  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
      >
        <div className="relative p-4 w-[800px] max-w-3xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg  shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-2 border-b rounded-lg  dark:border-gray-600">
              <h3 className="text-xl mx-3 font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg -lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <Table
              variant=""
              width={"700px"}
              colorScheme="#C9D5DD"
              borderWidth="0.5px"
              className="mx-auto bg-slate-200"
            >
              <Thead fontWeight="bold">
                <Tr>
                  <Th fontWeight="bold">Hyperware</Th>
                  <Th>Region1</Th>
                  <Th>Region2</Th>
                  <Th>Region3</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(ForecastHyperware).map((channel) => (
                  <Tr key={channel}>
                    <Td>
                      <strong>{channel}</strong>
                    </Td>
                    <Td>{ForecastHyperware[channel].region1}</Td>
                    <Td>{ForecastHyperware[channel].region2}</Td>
                    <Td>{ForecastHyperware[channel].region3}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            
            <Table
              variant=""
              width={"700px"}
              colorScheme="#C9D5DD"
            
              className="mx-auto bg-slate-200"
              borderTop={5}
            
              borderStyle={"solid"}
            >
              <Thead fontWeight="bold">
                <Tr>
                  <Th fontWeight="bold">Metaware</Th>
                  <Th>Region1</Th>
                  <Th>Region2</Th>
                  <Th>Region3</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(ForecastMetaware).map((channel) => (
                  <Tr key={channel}>
                    <Td>
                      <strong>{channel}</strong>
                    </Td>
                    <Td>{ForecastMetaware[channel].region1}</Td>
                    <Td>{ForecastMetaware[channel].region2}</Td>
                    <Td>{ForecastMetaware[channel].region3}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {/* Modal footer */}
            <div className="flex justify-end items-center p-4 md:p-3 border-t border-gray-200 rounded-lg -b dark:border-gray-600">
              <button
                onClick={toggleModal}
                type="button"
                className="h-10 bg-slate-400 rounded-lg -lg p-2 text-black text-center text-xl cursor-pointer  ease-in duration-150  place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto"
                data-modal-hide="default-modal"
              >
                All Fine
              </button>
              <button
                onClick={toggleModal}
                type="button"
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg -lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                data-modal-hide="default-modal"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastPreview;
