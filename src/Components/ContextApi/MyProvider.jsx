import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  // const api = "http://127.0.0.1:8000/api3/simulation"
  // const api1 = "http://127.0.0.1:8000"
  const api = "https://api.cyberbriefs.org/api3/simulation";
  const api1 = "https://api.cyberbriefs.org";

  return (
    <MyContext.Provider
      value={{
        api,
        api1
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
