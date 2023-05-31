import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import MainNavBar from '../orders/MainNavBar';

function Movements() {
    const [payCategories, setPayCategories] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            await axios.get('http://localhost:3001/movcategories')
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].tipo.includes("Pagar")) {
                            setPayCategories(prevArray => [...prevArray, response.data[i]])
                        }               
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
        fetchStates()
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        // Aquí es donde enviarías la información de inicio de sesión al servidor
        try {
            const movCategoriesId = document.getElementById("category").value
            const user_id = JSON.parse(localStorage.getItem("userId"))

            const formData = new FormData(event.target);
            const movData = {
            movCategoriesId: movCategoriesId,
            userId: user_id,
            movement: formData.get('gasto'),
            valueUsd: formData.get('USD'),
            valuePesos: formData.get('pesos'),
            valueTrans: formData.get('banco'),
            valueMp: formData.get('mercadopago'),
            };

            const response = await axios.post('http://localhost:3001/movements', movData);
            if (response.status === 200){
            alert("Gasto agregado")
            window.location.reload();
            }
        } catch (error) {
            alert(error.response.data);
        }
    }

  
    return (
        <div className='bg-gray-300 min-h-screen pb-2'>
            <MainNavBar />
            <div className='bg-white my-2 py-8 px-2 max-w-7xl mx-auto'>
                <h1 className="text-center text-5xl">Gastos</h1>
                {/* Reparaciones */}
                <div className="p-4 max-w-6xl mx-auto">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <label>Reparaciones</label>
                        <div className="mb-2">
                            <div className='flex items-end'>
                                {/* Valores */}
                                <div className='w-full text-center'>
                                    <label className="block text-gray-700 font-bold mb-2 border-b-2">Monto *</label>
                                    <div className='flex'>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Pesos:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="pesos" 
                                                name='pesos'
                                            />
                                        </div>     
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">USD:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="USD" 
                                                name='USD'
                                            />
                                        </div>    
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Banco:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="banco" 
                                                name='banco'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">MercadoPago:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="mercadopago" 
                                                name='mercadopago'
                                            />
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-end'>
                                <div className='w-1/2'>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Cuenta: *</label>
                                    <select name="category" id="category" className='w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' >
                                        <option value="" disabled selected>Cuenta</option>
                                        {payCategories.map((category) => (
                                            <option key={category.idmovcategories} value={category.idmovcategories}>{category.categories}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-full text-center'>
                                    <label className="block text-gray-700 font-bold mb-2 border-b-2">Vuelto *</label>
                                    <div className='flex'>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Pesos:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="pesos" 
                                                name='pesos'
                                            />
                                        </div>     
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">USD:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="USD" 
                                                name='USD'
                                            />
                                        </div>    
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Banco:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="banco" 
                                                name='banco'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">MercadoPago:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="mercadopago" 
                                                name='mercadopago'
                                            />
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Guardar
                        </button>
                        <button 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => { navigate(`/home`) }} >
                                Volver
                        </button>
                    </form>
                </div>
                {/* Repuestos */}
                <div className="p-4 max-w-6xl mx-auto">
                    <Link to='/stock'><h1>REPUESTOS</h1></Link>
                </div>
                {/* Otros */}
                <div className="p-4 max-w-6xl mx-auto">
                    <Link to='/movesothers'><h1>OTROS</h1></Link>
                </div>
                {/* Ventas */}
                <div className="p-4 max-w-6xl mx-auto">
                    <Link to='/movessells'><h1>VENTAS</h1></Link>
                </div>
                {/* Sucursales */}
                <div className="p-4 max-w-6xl mx-auto">
                    <Link to='/movesbranches'><h1>SUCURSALES</h1></Link>
                </div>
            </div>
        </div>
    );
}

export default Movements