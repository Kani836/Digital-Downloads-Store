import React, { useEffect } from 'react';
import { Heart, ShoppingCart, BookmarkPlus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import type { Book } from '../types';

const Home = () => {
  const { books, setBooks, user, cartItems, favorites, savedForLater } = useStore();

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching books:', error);
        return;
      }

      setBooks(data || []);
    };

    fetchBooks();
  }, [setBooks]);

  const isInCart = (bookId: string) => {
    return cartItems.some(item => item.book_id === bookId);
  };

  const isInFavorites = (bookId: string) => {
    return favorites.some(item => item.book_id === bookId);
  };

  const isInSavedForLater = (bookId: string) => {
    return savedForLater.some(item => item.book_id === bookId);
  };

  const handleAddToCart = async (book: Book) => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .insert([{ user_id: user.id, book_id: book.id }]);

    if (error) {
      console.error('Error adding to cart:', error);
      return;
    }
  };

  const handleAddToFavorites = async (book: Book) => {
    if (!user) return;

    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: user.id, book_id: book.id }]);

    if (error) {
      console.error('Error adding to favorites:', error);
      return;
    }
  };

  const handleSaveForLater = async (book: Book) => {
    if (!user) return;

    const { error } = await supabase
      .from('saved_for_later')
      .insert([{ user_id: user.id, book_id: book.id }]);

    if (error) {
      console.error('Error saving for later:', error);
      return;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Digital Books Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{book.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-indigo-600">${book.price}</span>
                <div className="flex space-x-2">
                  {user && (
                    <>
                      <button
                        onClick={() => handleAddToFavorites(book)}
                        disabled={isInFavorites(book.id)}
                        className={`p-2 rounded-full ${
                          isInFavorites(book.id)
                            ? 'bg-pink-100 text-pink-500'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-pink-500'
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleSaveForLater(book)}
                        disabled={isInSavedForLater(book.id)}
                        className={`p-2 rounded-full ${
                          isInSavedForLater(book.id)
                            ? 'bg-indigo-100 text-indigo-500'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-indigo-500'
                        }`}
                      >
                        <BookmarkPlus className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(book)}
                        disabled={isInCart(book.id)}
                        className={`p-2 rounded-full ${
                          isInCart(book.id)
                            ? 'bg-green-100 text-green-500'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-green-500'
                        }`}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;