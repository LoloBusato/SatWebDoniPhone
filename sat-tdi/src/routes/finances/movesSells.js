import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MainNavBar from '../orders/MainNavBar';

function MovesSells() {
    const [payCategories, setPayCategories] = useState([])
    const [sellStock, setSellStock] = useState([])
    const categoria = "Venta"
    const [catId, setCatId] = useState("")

    const [clients, setClients] = useState([])
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')

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

            await axios.get('http://localhost:3001/stock')
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].repuesto.includes("Bateria")) {
                            setSellStock(prevArray => [...prevArray, response.data[i]])
                        }                    
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
                });

            
            await axios.get('http://localhost:3001/clients')
                .then(response => {
                    setClients(response.data)
                })
                .catch(error => {
                    console.error(error)
                })

            await axios.get(`http://localhost:3001/movcategories/${categoria}`)
                .then(response => {
                    setCatId(response.data.idmovcategories)
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
        let clientId = "";
        try {
            const formData = new FormData(event.target);
            const clientData = {
                name: formData.get('name').trim(),
                surname: formData.get('surname').trim(),
                email: formData.get('email').trim(),
                instagram: formData.get('instagram').trim(),
                phone: formData.get('phone').trim(),
                postal: formData.get('postal').trim(),
            };
            if (clientData.name === "" || clientData.surname === ""){
                alert("Agregar nombre y apellido al cliente")
            } else if(clientData.email === "" && clientData.instagram === "" && clientData.phone === "") {
                alert("Agregar algun metodo de contacto al cliente")
            } else{
                const responseClient = await axios.post('http://localhost:3001/clients', clientData);
                if (responseClient.status === 200){
                    clientId = responseClient.data[0].idclients
                } 
            }
            console.log(catId)

            const movCategoriesId = document.getElementById("category").value
            const user_id = JSON.parse(localStorage.getItem("userId"))

            const movData = {
            movCategoriesId: movCategoriesId,
            userId: user_id,
            movement: formData.get('gasto'),
            valueUsd: formData.get('USD'),
            valuePesos: formData.get('pesos'),
            valueTrans: formData.get('banco'),
            valueMp: formData.get('mercadopago'),
            };

            //const response = await axios.post('http://localhost:3001/movements', movData);
            //if (response.status === 200){
            //alert("Gasto agregado")
            //window.location.reload();
            //}
        } catch (error) {
            alert(error.response.data);
        }
    }

    const handleClienteSeleccionado = (cliente) => {
        setNombre(cliente.name);
        setApellido(cliente.surname);
        document.getElementById("instagram").value = cliente.instagram;
        document.getElementById("email").value = cliente.email;
        document.getElementById("phone").value = cliente.phone;
        document.getElementById("postal").value = cliente.postal;
        // aquí puedes utilizar los datos del cliente seleccionado para autocompletar otros inputs
        };

    return (
        <div className='bg-gray-300 min-h-screen pb-2'>
            <MainNavBar />
            <div className='bg-white my-2 py-8 px-2 max-w-4xl mx-auto'>
                <h1 className="text-center text-5xl">Ventas</h1>
                {/* Ventas */}
                <div className="p-4 max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-2">
                            {/* Cliente */}
                            <div className="mb-1 p-2 bg-blue-100">
                                    <label>Cliente</label>
                                    <div className='flex'>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nombre: *</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                placeholder="John"
                                                value={nombre}
                                                onChange={(event) => setNombre(event.target.value)}
                                            />  
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="surname">Apellido: *</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="surname" 
                                                name="surname" 
                                                placeholder="Doe"
                                                value={apellido}
                                                onChange={(event) => setApellido(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {nombre &&  (
                                        <ul className='bg-gray-100 absolute'>
                                            {clients
                                                .filter((client) => 
                                                    client.name.toLowerCase().includes(nombre.toLowerCase()) &&
                                                    client.surname.toLowerCase().includes(apellido.toLowerCase())
                                                    )
                                                .map((client) => 
                                                    <li className='border px-2 py-1' key={client.idclients} onClick={() => handleClienteSeleccionado(client)}>{client.name} {client.surname} - {client.email} {client.instagram} {client.phone}</li>
                                            )}
                                        </ul>
                                    )}
                                    <label className="flex justify-center text-gray-700 font-bold mt-2" htmlFor="contacto">Contacto *</label>
                                    <div className='flex'>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Instagram:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="instagram" 
                                                placeholder="thedoniphone"
                                                name="instagram" 
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Telefono:</label>                        
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="phone" 
                                                name="phone" 
                                                placeholder="xx-xxxx-xxxx"
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="email" 
                                                name="email" 
                                                placeholder="xxx@xxx.com"
                                            />  
                                        </div>
                                    </div>
                                    <label className="block text-gray-700 font-bold my-2" htmlFor="email">Codigo Postal: (opcional)</label>                        
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        type="text" 
                                        id="postal" 
                                        name="postal" 
                                        placeholder="1427"
                                    />
                            </div>
                            <div className='mb-1 p-2 bg-blue-100'>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Equipo: *</label>
                                <select name="category" id="category" className='w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' >
                                    <option value="" disabled selected>Equipo</option>
                                    {sellStock.map((device) => (
                                        <option key={device.idstock} value={device.repuesto}>{device.repuesto}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex items-end bg-blue-100 mb-1 p-2'>
                                {/* Valores */}
                                <div className='w-full text-center'>
                                    <label className="block text-gray-700 font-bold mb-2 border-b-2">Pago *</label>
                                    <div className='flex'>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Pesos:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="clientePesos" 
                                                name='clientePesos'
                                            />
                                        </div>     
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">USD:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="clienteUSD" 
                                                name='clienteUSD'
                                            />
                                        </div>    
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Banco:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="clienteBanco" 
                                                name='clienteBanco'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">MercadoPago:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="clienteMercadopago" 
                                                name='clienteMercadopago'
                                            />
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-end bg-blue-100 mb-1 p-2'>
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
                                                id="cajaPesos" 
                                                name='cajaPesos'
                                            />
                                        </div>     
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">USD:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="cajaUSD" 
                                                name='cajaUSD'
                                            />
                                        </div>    
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Banco:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="cajaBanco" 
                                                name='cajaBanco'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">MercadoPago:</label>
                                            <input 
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                type="text" 
                                                id="cajaMercadopago" 
                                                name='cajaMercadopago'
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
            </div>
        </div>
    );
}

export default MovesSells