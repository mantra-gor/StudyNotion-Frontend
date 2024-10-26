import { Suspense } from "react";
import Router from "./router/Router";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router />
    </Suspense>
  );
}

export default App;
