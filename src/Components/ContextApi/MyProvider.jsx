import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const api = "http://127.0.0.1:8000/simulation"
  const api1 = "http://127.0.0.1:8000"
  // const api = "https://1-smarter.net/simulation";
  // const api1 = "https://1-smarter.net";

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

