import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import Checklist from "./pages/Checklist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/checklist",
    element: <Checklist />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
