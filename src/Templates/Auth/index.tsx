import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const [err, setErr] = useState<string | null>(null)

    const navigate = useNavigate();

    const handleTokenObtain = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/login');
            const token = response.data.token;
            localStorage.setItem('token', token);
            // Redirect the user to the route for calculations after obtaining the token
            navigate("/math")
        } catch (err) {
            console.error('Error occurred:', err);
            setErr(err.message)
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className='text-2xl text-white font-bold'>Obtenha o token para acessar a página de cálculos</h2>

            <div className='mt-4 '>
                <p className='text-white font-bold'>Clique no botão abaixo para obter o token:</p>

                <button className="w-full grid grid-cols-subgrid bg-amber-600 text-white mt-6 hover:bg-white hover:text-amber-600 transition p-3 rounded-md" onClick={handleTokenObtain}>Obter token de acesso</button>
            </div>

            {err !== null &&
                <p className='text-amber-600'>Houve um error ao obter o token: {err}</p>
            }
        </div>
    );
};

