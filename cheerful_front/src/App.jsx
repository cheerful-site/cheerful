import MainLayout from "./components/Layout/MainLayout/MainLayout";
import MainRoute from "./routers/MainRoute";

function App() {
  return (
    <>
      <MainLayout>
        <MainRoute />
      </MainLayout>
    </>
  );
}

export default App;
