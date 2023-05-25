import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MainNavBar from '../orders/MainNavBar';

function Movements() {
    const [categories, setCategories] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            await axios.get('http://localhost:3001/movcategories')
                .then(response => {
                    setCategories(response.data)
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

            const formData = new FormData(event.target);
            const movData = {
            accountId: formData.get(''),
            movCategoriesId: formData.get(''),
            userId: formData.get(''),
            movement: formData.get(''),
            valueUsd: formData.get(''),
            valuePesos: formData.get(''),
            valueTrans: formData.get(''),
            valueMp: formData.get(''),
            };
            console.log(movData)

            // const response = await axios.post('http://localhost:3001/movements', movData);
            // if (response.status === 200){
            // alert("Gasto agregado")
            // window.location.reload();
            // navigate('/home')
            // }
        } catch (error) {
            alert(error.response.data);
        }
    }

  
    return (
        <div className='bg-gray-300 min-h-screen pb-2'>
            <MainNavBar />
            <div className='bg-white my-2 py-8 px-2 max-w-3xl mx-auto'>
                <h1 className="text-center text-5xl">Agregar gasto</h1>
                <div className="p-4 max-w-xl mx-auto">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-2">
                            <div>
                                <div className='w-full'>
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Sucursal: *</label>
                                    <select name="category" id="category" >
                                        <option value="" disabled selected>Categoria</option>
                                        {categories.map((category) => (
                                            <option key={category.idmovcategories} value={category.idmovcategories}>{category.categories}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-full'>
                                    <label className="block text-gray-700 font-bold mb-2">Gasto: *</label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        type="text" 
                                        id="gasto" 
                                        name='gasto'
                                        placeholder="Baterias iPhone X"
                                    />
                                </div>
                                {/* Valores */}
                                <div className='w-full'>
                                    <label className="block text-gray-700 font-bold mb-2">Monto</label>
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
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Transferencia al banco:</label>
                                        <input 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                            type="text" 
                                            id="banco" 
                                            name='banco'
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Transferencia a MercadoPago:</label>
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
            </div>
        </div>
    );
}

export default Movements