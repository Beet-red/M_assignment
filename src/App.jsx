import DrawingBoard from "./components/Drawingboard";
import Header from "./components/Header";

const App = () => {
return (
    <>
      <Header />
      <main
        style={{
          width: "100vw",
          height: "100vh",
          paddingTop: "60px", // header height
        }}
      >
        <DrawingBoard />
      </main>
    </>
  );
};

export default App;
