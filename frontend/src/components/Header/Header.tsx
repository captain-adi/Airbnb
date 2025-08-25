import { useTheme } from "@/theme/themeProvider";
import NewListing from "../NewListing/NewListing";
import { Moon, Sun } from "lucide-react";
import SignUp from "../SignUp/SignUp";
import Login from "../LogIn/Login";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useLogout } from "@/hooks/query";
import { toast } from "sonner";

function Header() {
  const { theme, setTheme } = useTheme();
  const { user, setUser } = useAuth();
  const { mutate: logout ,isPending } = useLogout();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_id");
    if (storedUser) {
      setUser(storedUser);
    }
  }, [user]);
  console.log("Header User:", user);
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        localStorage.removeItem("user_id");
        setUser(null);
        toast(res.message);
      },
      onError: (err : any) => {
        toast(err.response.data.message);
      }
    });
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="h-8 w-8 text-rose-500"
            fill="currentColor"
          >
            <path d="M16 2.5c-2.8 0-4.9 1.5-6.3 4.4l-4.9 10C3.5 19.3 3 21 3 22.4 3 27 6.4 30 10 30c2.2 0 4-1 6-3.3 2 2.3 3.8 3.3 6 3.3 3.6 0 7-3 7-7.6 0-1.4-.5-3.1-1.8-5.5l-4.9-10C20.9 4 18.8 2.5 16 2.5zm0 4c1.7 0 2.8.9 3.7 2.7l4.8 9.9c.9 1.7 1.1 2.8 1.1 3.3 0 2.4-1.7 3.6-3.5 3.6-1.3 0-2.7-.7-4.6-2.8l-.8-.9-.8.9c-1.9 2.1-3.3 2.8-4.6 2.8-1.8 0-3.5-1.2-3.5-3.6 0-.5.2-1.6 1.1-3.3l4.8-9.9C13.2 7.4 14.3 6.5 16 6.5zm0 5.2c-1.6 0-2.8 1.3-2.8 2.9 0 1.6 1.2 2.9 2.8 2.9s2.8-1.3 2.8-2.9c0-1.6-1.2-2.9-2.8-2.9z" />
          </svg>
          <span className="text-xl font-semibold">airbnb</span>
        </div>

        {/* Search Bar */}
        <div>
          {user && <NewListing />}
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-4">
          {theme === "dark" ? (
            <Sun
              className="cursor-pointer text-yellow-300"
              onClick={() => setTheme("light")}
            />
          ) : (
            <Moon className="cursor-pointer" onClick={() => setTheme("dark")} />
          )}

          {user ? (
            <>
              <Button className="cursor-pointer" onClick={handleLogout}>
                {isPending ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <>
              <SignUp />
              <Login />
            </>
          )}
          <div className="border rounded-full px-3 py-1 flex items-center gap-2">
            ☰ <span>👤</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
