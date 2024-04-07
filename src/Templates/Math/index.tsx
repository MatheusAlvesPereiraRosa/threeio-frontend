import { useState, useEffect } from "react";
import { motion } from 'framer-motion'

import { Navbar } from "../../Components/Navbar";

import { useNavigate } from "react-router-dom";

import { PiMathOperationsFill } from "react-icons/pi";
import { AiOutlineFieldNumber } from "react-icons/ai";

import axios from "axios";
import './index.css'

interface Form {
    method: string
    num1: number
    num2: number
}

export const Form = () => {
    const [form, setForm] = useState<Form>({
        method: "",
        num1: 0,
        num2: 0
    })

    const [result, setResult] = useState<number>(0)

    const [error, setError] = useState<string>("");

    const navigate = useNavigate()

    useEffect(() => {
        // Fetch token from localStorage and include it in axios defaults
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `${token}`;
        } else {
            navigate("/")
        }

        // Check token validity by sending a request to validate-token route
        axios.get('/api/math/validate-token')
            .then(res => {
                // Token is valid, proceed to /math route
                console.log(res.data.msg);
            })
            .catch(error => {
                // Token is invalid or expired, redirect to login page
                console.error('Token is invalid or expired:', error);
                navigate('/');
            });
    }, [navigate]);

    const calculate = async () => {
    
        try {
            const response = await axios.post("http://localhost:3000/api/math/calculate", form);
            setResult(response.data.result);
            setError("");
        } catch (err) {
            console.error("Error occurred:", err);
            setError(err.response?.data?.message || "An error occurred while processing the request.");
        }
    }

    const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prevState => ({
            ...prevState,
            [name]: parseFloat(value)
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        calculate();
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center gap-10 items-center my-12 form-height">
                <motion.form
                    initial={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit} className="bg-cyan-900 shadow-md rounded-lg px-8 pt-6 pb-8"
                >
                    {error !== "" &&
                        <p className="flex justify-center items-center rounded-md bg-red-600 text-white text-xl font-bold p-4 mb-4">{error}</p>
                    }
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className="">
                            <div className="flex items-center mb-2">
                                <span className="me-2"><PiMathOperationsFill className="icon text-white" size={16} /></span>
                                <label htmlFor="name" className="text-md block text-white font-bold">Método matemático</label>
                            </div>
                            <select
                                name="method"
                                value={form.method}
                                onChange={handleMethodChange}
                                className="bg-cyan-950 border-cyan-800 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight placeholder:text-slate-400 focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Selecione o tipo de cálculo</option>
                                <option value="soma">Somar</option>
                                <option value="sub">Subtrair</option>
                                <option value="divi">Dividir</option>
                                <option value="multi">Multiplicar</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t-4 mt-6 pt-4 border-cyan-950 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className="">
                            <div className="flex items-center mb-2">
                                <span className="me-2"><AiOutlineFieldNumber className="icon text-white" size={18} /></span>
                                <label htmlFor="num1" className="text-md block text-white font-bold ">Número 1</label>
                            </div>
                            <input
                                name="num1"
                                type="number"
                                placeholder="0"
                                value={form.num1}
                                onChange={handleNumChange}
                                className="bg-cyan-950 border-cyan-800 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight placeholder:text-slate-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="">
                            <div className="flex items-center mb-2">
                                <span className="me-2"><AiOutlineFieldNumber className="icon text-white" size={18} /></span>
                                <label htmlFor="num2" className="text-md block text-white font-bold ">Número 2</label>
                            </div>
                            <input
                                name="num2"
                                type="number"
                                placeholder="0"
                                value={form.num2}
                                onChange={handleNumChange}
                                className="bg-cyan-950 border-cyan-800 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight placeholder:text-slate-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full grid grid-cols-subgrid bg-amber-600 text-white mt-6 hover:bg-white hover:text-amber-600 transition p-3 rounded-md">
                        Calcular
                    </button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-cyan-900 shadow-md rounded-lg px-8 pt-6 pb-8"
                >
                    <div className="border-b-4 px-6 mb-4 pb-4 border-cyan-950">
                        <div className="text-xl block text-white font-bold mb-2">{form.num1}</div>
                        <div className="text-xl block text-white font-bold">{form.num2}</div>
                    </div>

                    {form.method && (
                        <div className="math-operator text-white text-2xl">
                            {form.method === 'soma' && '+'}
                            {form.method === 'sub' && '-'}
                            {form.method === 'divi' && '÷'}
                            {form.method === 'multi' && '×'}
                        </div>
                    )}

                    <div className="text-xl block text-white font-bold text-center">{result}</div>
                </motion.div>
            </div>
        </>
    )
}
