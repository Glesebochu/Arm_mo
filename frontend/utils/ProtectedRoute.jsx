import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMe } from "../slices/AuthSlice";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(fetchMe());
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace={true} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
