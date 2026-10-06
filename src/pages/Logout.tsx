import toast from "react-hot-toast";
import { Button } from "../components/Button";
import { useLogoutMutation } from "../services/authApi";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../app/authSlice";

export const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const apiResponse = await logout().unwrap();
      dispatch(removeCredentials());
      toast.success(apiResponse.message);
    } catch (error: any) {
      console.log("Logout Error=>", error);
      toast.error(error.data.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-125">
          <Button onClick={handleClick}>
            {isLoading ? "Logout..." : "Logout"}
          </Button>
        </div>
      </div>
    </>
  );
};
