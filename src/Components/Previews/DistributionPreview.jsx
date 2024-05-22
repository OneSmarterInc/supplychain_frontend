import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const DistributionPreview = ({ DistributionDataPreview, toggleModal }) => {
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
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-2 border-b rounded-lg dark:border-gray-600">
              <h3 className="text-xl mx-3 font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <Table
              variant="striped"
              width={"700px"}
              colorScheme="#C9D5DD"
              borderWidth="0.5px"
              className="mx-auto bg-slate-200"
            >
              <Thead fontWeight="bold">
                <Tr>
                  <Th fontWeight="bold"></Th>
                  <Th>Product Zero</Th>
                  <Th>Hyperware</Th>
                  <Th>Metaware</Th>
                </Tr>
              </Thead>
              <Tbody>
                {DistributionDataPreview &&
                  Object.keys(DistributionDataPreview).map((channel) => {
                    if (channel === "cross_docking") {
                      return DistributionDataPreview[channel].map(
                        (carrierData, index) => (
                          <React.Fragment key={index}>
                            <Tr>
                              <Td>
                                <strong>Carrier {carrierData.carrier}</strong>
                              </Td>
                              <Td>{carrierData.region1}</Td>
                              <Td>{carrierData.region2}</Td>
                              <Td>{carrierData.region3}</Td>
                            </Tr>
                          </React.Fragment>
                        )
                      );
                    } else {
                      return (
                        <Tr key={channel}>
                          <Td>
                            <strong>{channel}</strong>
                          </Td>
                          <Td>{DistributionDataPreview[channel].region1}</Td>
                          <Td>{DistributionDataPreview[channel].region2}</Td>
                          <Td>{DistributionDataPreview[channel].region3}</Td>
                        </Tr>
                      );
                    }
                  })}
              </Tbody>
            </Table>
            {/* Modal footer */}
            <div className="flex justify-end items-center p-4 md:p-3 border-t border-gray-200 rounded-lg dark:border-gray-600">
              <button
                onClick={toggleModal}
                type="button"
                className="h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer ease-in duration-150 hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2"
                data-modal-hide="default-modal"
              >
                All Fine
              </button>
              <button
                onClick={toggleModal}
                type="button"
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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

export default DistributionPreview;
