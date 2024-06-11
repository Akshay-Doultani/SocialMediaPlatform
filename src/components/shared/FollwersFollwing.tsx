import React, { useEffect, useState } from 'react';
import { getFollowers, getFollowing } from '@/lib/appwrite/api';

interface FollowersFollowingProps {
  userId: string;
}

const FollowersFollowing: React.FC<FollowersFollowingProps> = ({ userId }) => {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFollowersAndFollowing = async () => {
      setLoading(true);
      try {
        const followersList = await getFollowers(userId);
        const followingList = await getFollowing(userId);
        setFollowers(followersList);
        setFollowing(followingList);
      } catch (error) {
        console.error('Error fetching followers and following:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowersAndFollowing();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Followers</h2>
        {followers.length === 0 ? (
          <p>No followers yet.</p>
        ) : (
          <ul>
            {followers.map((follower) => (
              <li key={follower}>{follower}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Following</h2>
        {following.length === 0 ? (
          <p>Not following anyone yet.</p>
        ) : (
          <ul>
            {following.map((follow) => (
              <li key={follow}>{follow}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowersFollowing;
