import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/');
    }, [navigate]);

    return null; // Since this is a redirect component, it doesn't need to render anything
};

export default Logout;
