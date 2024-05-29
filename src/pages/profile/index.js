import React, { useState, useEffect } from 'react';
import './index.css';
import { authAxiosInstance } from '../../utils/AxiosConfig';

function ProfileSettings() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        telephone: '',
        monthly_income: '',
        cpf: '',
        birth_date: '',
        pix_key: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await authAxiosInstance.get('/users/me');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await authAxiosInstance.put('/users/me', userData);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <>
            <div className="mt-2">
                <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label htmlFor="name"  className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                            <input id="name" name="name" type="text" readOnly disabled value={userData.name} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-green-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input id="email" name="email" type="email" readOnly disabled value={userData.email} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-green-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                            <input id="telephone" name="telephone" type="text" value={userData.telephone} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-green-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="monthly_income" className="block text-sm font-medium text-gray-700 mb-2">Renda Mensal</label>
                            <input id="monthly_income" name="monthly_income" type="number" value={userData.monthly_income} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-green-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                            <input id="cpf" name="cpf" type="text" readOnly disabled value={userData.cpf} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-green-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-2">Data Nascimento</label>
                            <input id="birth_date" name="birth_date" type="date" value={userData.birth_date} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-green-400" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pix_key" className="block text-sm font-medium text-gray-700 mb-2">Chave PIX</label>
                            <input id="pix_key" name="pix_key" type="text" value={userData.pix_key} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-green-400" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary float-right bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Update</button>
                </form>
            </div>
        </>
    );
}

export default ProfileSettings;
