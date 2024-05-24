import React from 'react';
import { FaBell } from 'react-icons/fa';
import perfil from '../../assets/perfil_simulafin.png';

const TopBar = () => {
    const userName = 'Nome do Usuário';
    const profilePicture = perfil; // Substitua pelo caminho real da imagem de perfil

    return (
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-3 shadow-md">
            <div />
            <div className="flex items-center">
                <FaBell className="mr-4 cursor-pointer" />
                <div className="flex items-center">
                    <span className="mr-2">{userName}</span>
                    <img src={profilePicture} alt="Profile" className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
