import { Models } from 'appwrite';
import React from 'react'
import Loader from '@/components/shared/Loader';
import GridPostList from './GridPostList';


type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResult = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {

    if (isSearchFetching) return <Loader/>

    if (searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents}/>
        )
    }
    return (
        <p className=' text-light-4 mt-10 text-center w-full'>
              No Results Founds
        </p>
    )
}

export default SearchResult