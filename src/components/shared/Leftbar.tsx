import { INITIAL_USER, useUserContext } from '@/auth/contexts/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { link } from 'fs';
import Loader from '@/components/shared/Loader';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-queries/queries';



const Leftbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className=' leftsidebar'>
      <div className='flex flex-col gap-1'>
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader/>
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
            <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className='h-14 w-14 rounded-full mt-5 mb-5'
            />
            <div className='flex flex-col'>
              <p className=' body-bold mt-2'> {user.name}</p>
              <p className=' small-regular text-light-4'>{user.username}</p>
            </div>
          </Link>
        )}

        <ul className=' flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            
            return (
              <li key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`} />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav >
  )
}

export default Leftbar
