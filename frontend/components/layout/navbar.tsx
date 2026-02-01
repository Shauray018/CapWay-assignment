"use client"

import { useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UsersRound, MapPin, ShoppingCart, User, LogOut } from "lucide-react";
import { useCartStore } from '@/store/cartStore';
import { useFilterStore } from '@/store/filterStore';
import CartSheet from '../cart/cartSheet';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

export default function NavBar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const { searchQuery, setSearchQuery } = useFilterStore();
    const { user, isAuthenticated, logout } = useAuthStore();
    const router = useRouter(); 

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        router.push('/login');
    };
    const cartItemCount = getTotalItems();

    return (
        <>
            <div className="flex flex-row p-4 justify-between items-center border-b">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pink-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <div className="text-pink-800 font-extrabold text-xl">
                            EasyMart
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>10115 New York</span>
                    </div>
                </div>
                
                <div className="flex-1 max-w-md mx-8">
                    <Input 
                        placeholder="Search products..." 
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded transition-colors"
                    >
                        <div className="relative">
                            <ShoppingCart size={20} className="text-pink-700" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                        <span className="text-sm font-medium">Cart</span>
                    </button>
                    
                    {isAuthenticated && user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
            ) : null}
                </div>
            </div>

            <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}