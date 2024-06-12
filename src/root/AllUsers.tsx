import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { getUsers } from "@/lib/appwrite/api";
import { useState, useEffect } from "react";
import { Models } from "appwrite";
import { useUserContext } from "@/auth/contexts/AuthContext"; // Import the user context

const AllUsers = () => {
  const { toast } = useToast();
  const [creators, setCreators] = useState<Models.DocumentList<Models.Document> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { user } = useUserContext(); // Get the current user from the user context

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        if (data) {
          setCreators(data);
        } else {
          setCreators(null);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast({ title: "Something went wrong." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  if (isError) {
    return null;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents
              // Filter out the current user's profile
              .filter((creator) => creator.$id !== user.id)
              .map((creator) => (
                <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                  <UserCard user={creator} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
