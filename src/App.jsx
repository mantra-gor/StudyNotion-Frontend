import { Suspense } from "react";
import Router from "./router/Router";
import FallbackLoading from "./components/ui/spinner/FallbackLoading";

function App() {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Router />
    </Suspense>
  );
}

export default App;
