import React, { useState } from 'react';
import { FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import perfil from '../../assets/perfil_simulafin.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const TopBar = () => {
    const userName = 'Victor Rayan Adriano Ferreira';
    const profilePicture = perfil; // Substitua pelo caminho real da imagem de perfil
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const { authLogout } = useAuth();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        authLogout();
        setLogoutModalOpen(false);
    };

    return (
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-3 shadow-md relative">
            <div />
            <div className="flex items-center">
                <FaBell className="mr-4 cursor-pointer" />
                <div className="relative">
                    <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                        <span className="mr-2">{userName}</span>
                        <img src={profilePicture} alt="Profile" className="h-8 w-8 rounded-full" />
                    </div>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                                <FaUser className="mr-2" /> Modificar Perfil
                            </Link>
                            <button
                                onClick={() => setLogoutModalOpen(true)}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                            >
                                <FaSignOutAlt className="mr-2" /> Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {logoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4 text-black">Confirmar Logout</h2>
                        <p className="mb-4 text-black">Deseja mesmo sair?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setLogoutModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopBar;
