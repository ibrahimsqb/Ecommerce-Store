import React from 'react'
import { useEffect } from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {
    addToFavorites,
    removeFromFavorites,
    setFavorites
} from '../../redux/feautures/favorites/favoriteSlice'
import {addFavoriteToLocalStorage, 
    getFavoritesFromLocalStorage, 
    removeFavoriteFromLocalStorage} from '../../Utils/localstorage'

const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorite = favorites.some((p) => p._id == product._id)

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, []);


    const toggleFavorites = () => {
        if(isFavorite) {
            dispatch(removeFromFavorites(product))
            //remove product from local storage
            removeFavoriteFromLocalStorage(product._id)
        } else {
            dispatch(addToFavorites(product));
            //add product to localstorage
            addFavoriteToLocalStorage(product)
        }
    }

  return <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer'>
    {isFavorite ? (<FaHeart className='text-pink-500' />): (
        <FaRegHeart className='text-white' />
    )}

  </div>
}

export default HeartIcon