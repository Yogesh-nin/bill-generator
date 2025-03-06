import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logout } from "@/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RootState } from "@/redux/store";

interface UserT {
    email: string;
    password: string
}

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user) as UserT | null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="w-full p-4 shadow-md bg-white flex justify-end">
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            className=" py-1"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
           <span className="hidden lg:inline-block">{user?.email}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2">
          <Button
            onClick={() => handleLogOut()}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default Navbar;
