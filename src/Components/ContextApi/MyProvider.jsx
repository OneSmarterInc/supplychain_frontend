import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const api = "http://127.0.0.1:8000/api3/simulation"
  // const api = "https://api.cyberbriefs.org/api3/simulation";

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
