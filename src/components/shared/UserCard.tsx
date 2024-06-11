import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

import { useState, useEffect } from "react";
import { followUser, unfollowUser, getFollowing } from "@/lib/appwrite/api";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/auth/contexts/AuthContext";

type UserCardProps = {
    user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
    const { user: currentUser } = useUserContext();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkFollowing = async () => {
            if (!currentUser) return;
            try {
                const followingList = await getFollowing(currentUser.id);
                setIsFollowing(followingList.includes(user.$id));
            } catch (error) {
                console.error('Error fetching following status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkFollowing();
    }, [currentUser, user.$id]);

    const handleFollow = async () => {
        if (!currentUser) return;
        setLoading(true);
        try {
            if (isFollowing) {
                await unfollowUser(currentUser.id, user.$id);
            } else {
                await followUser(currentUser.id, user.$id);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error handling follow/unfollow:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-card">
            <Link to={`/profile/${user.$id}`} className="flex items-center">
                <img
                    src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="creator"
                    className="rounded-full w-14 h-14"
                />
                <div className="flex-center flex-col gap-1 ml-4">
                    <p className="base-medium text-light-1 text-center line-clamp-1">
                        {user.name}
                    </p>
                    <p className="small-regular text-light-3 text-center line-clamp-1">
                        @{user.username}
                    </p>
                </div>
            </Link>
            <Button
                type="button"
                size="sm"
                className="shad-button_primary px-5 mt-2"
                onClick={handleFollow}
                disabled={loading}
            >
                {loading ? <Loader /> : isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
        </div>
    );
};

export default UserCard;
