import StorefrontRoutes from "./app/StorefrontRoutes";
import { StorefrontProvider } from "./state/StorefrontContext";

function App() {
  return (
    <StorefrontProvider>
      <StorefrontRoutes />
    </StorefrontProvider>
  );
}

export default App;
