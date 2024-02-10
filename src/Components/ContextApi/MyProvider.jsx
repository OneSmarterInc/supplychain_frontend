import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const api = "https://api.cyberbriefs.org/simulation"



  return (
    <MyContext.Provider
      value={{
        api
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
