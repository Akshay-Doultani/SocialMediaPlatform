
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-queries/queries';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite';
import Loader from '@/components/shared/Loader';
import React, { useEffect, useState } from 'react'

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
};

const PostStates = ({ post, userId }: PostStatsProps) => {
    const { mutate: likePost, isPending: isSavingPost } = useLikePost();
    const { mutate: savePost, isPending: isDeletingPost } = useSavePost();
    const { mutate: deleteSavePost } = useDeleteSavedPost();
    const { data: currentUser } = useGetCurrentUser();


    const likesList = post?.likes.map((user: Models.Document) => user.$id);
    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);


    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        let likesArray = [...likes];
        const hasLiked = likesArray.includes(userId);
        if (hasLiked) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }
        setLikes(likesArray);
        likePost({ postId: post?.$id || '', likesArray });
    }

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) =>  record?.post?.$id === post?.$id
    );

    useEffect(()=>{
       setIsSaved(savedPostRecord? true : false)
    },[currentUser])

    const handleSavePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        

        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavePost(savedPostRecord.$id);
        } else {
            savePost({ userId: userId, postId: post?.$id || '' });
            setIsSaved(true);
        }


    };
    return (
        <div
            className={`flex justify-between items-center z-20 `}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${checkIsLiked(likes, userId)
                        ? "/assets/icons/liked.svg"
                        : "/assets/icons/like.svg"
                        }`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                {isSavingPost|| isDeletingPost ? <Loader/>: <img
                    src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSavePost(e)}
                />}
            </div>
        </div>
    )
}

export default PostStates
