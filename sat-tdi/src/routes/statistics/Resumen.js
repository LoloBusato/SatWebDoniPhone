import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MainNavBar from '../orders/MainNavBar';

function Resumen() {

    const [allMovements, setAllMovements] = useState([])
    const [movname, setMovname] = useState([])
    const [categoriesDicc, setCategoriesDicc] = useState([])

    const [fechaInicioSearch, setFechaInicioSearch] = useState("");
    const [fechaFinSearch, setFechaFinSearch] = useState("");

    const [dolar, setDolar] = useState(500)

    useEffect(() => {
        const fetchStates = async () => {
            await axios.get(`http://localhost:3001/movements`)
                .then(response => {
                  setAllMovements(response.data)
                })
                .catch(error => {
                    console.error(error)
                })
                
            await axios.get(`https://api.bluelytics.com.ar/v2/latest`)
            .then(response => {
                setDolar(response.data.blue.value_sell)
            })
            .catch(error => {
                console.error(error)
            })

            await axios.get(`http://localhost:3001/movname`)
                .then(response => {
                    setMovname(response.data)
                })
                .catch(error => {
                    console.error(error)
                })

            await axios.get('http://localhost:3001/movcategories')
                .then(response => {
                    const categories = {}
                    for (let i = 0; i < response.data.length; i++) {
                        categories[response.data[i].categories] = 0;
                    }
                    setCategoriesDicc(categories)
                })
                .catch(error => {
                    console.error(error)
                })
        }
        fetchStates()
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const parcialdicc = {}
        for (const clave in categoriesDicc) {
            if (categoriesDicc.hasOwnProperty(clave)) {
                parcialdicc[clave] = 0;
            }
        }
        movname.forEach((item) => {
            const fecha = item.fecha.split("/")
            const createdAt = new Date(`${fecha[1]}-${fecha[0]}-${fecha[2]}`);
            const start = fechaInicioSearch.split("/")
            const startDate = fechaInicioSearch ? new Date(`${start[1]}-${start[0]}-${start[2]}`) : null;
            const end = fechaFinSearch.split("/")
            const endDate = fechaFinSearch ? new Date(`${end[1]}-${end[0]}-${end[2]}`) : null;

            // Verificar si la fecha está dentro del rango
            const isWithinRangeDate = (!startDate || createdAt >= startDate) && (!endDate || createdAt <= endDate);

            if (isWithinRangeDate) {
                allMovements.forEach((movement) => {
                    if(movement.movname_id === item.idmovname){
                        parcialdicc[movement.categories] += movement.unidades;
                    }
                })
            }
        });
        setCategoriesDicc(parcialdicc)
    };

    return (
        <div className='bg-gray-300 min-h-screen pb-2'>
            <MainNavBar />
            <div className="bg-white my-2 px-2 max-w-7xl mx-auto">
              <div className='text-center'>
                <h1 className="text-5xl font-bold py-8">Resumen</h1>
                <div className="border border-gray-300">
                    <form onSubmit={handleSearch} className="p-1 bg-blue-100">
                        <div className='grid grid-cols-2 gap-y-1'>
                            <div className='flex justify-end w-5/6 gap-x-2'>
                                <label>Fecha Inicio </label>
                                <input
                                    className='w-52'
                                    type="text"
                                    value={fechaInicioSearch}
                                    onChange={(e) => setFechaInicioSearch(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-end w-5/6 gap-x-2'>
                                <label>Fecha Fin </label>
                                <input
                                    className='w-52'
                                    type="text"
                                    value={fechaFinSearch}
                                    onChange={(e) => setFechaFinSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className="px-1 text-black font-bold bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200" >
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>
                <div className='grid grid-cols-3'>
                    {Object.entries(categoriesDicc).map(([key, value]) => (
                        <div key={key} className='flex flex-col border border-black'>
                            <span className='font-bold'>{key}: </span>
                            <span>{value}</span>
                        </div>
                    ))}
                </div>
                {/* Caja */}
                <div>
                    <h1>Caja</h1>
                    <div className='grid grid-cols-4'>
                        <div className='border border-black'>
                            <h1>Pesos</h1>
                            <h1>{categoriesDicc.Pesos}</h1>
                        </div>
                        <div className='border border-black'>
                            <h1>Dolares</h1>
                            <h1>{categoriesDicc.Dolares}</h1>
                        </div>
                        <div className='border border-black'>
                            <h1>Banco</h1>
                            <h1>{categoriesDicc.Banco}</h1>
                        </div>
                        <div className='border border-black'>
                            <h1>Mercado Pago</h1>
                            <h1>{categoriesDicc.MercadoPago}</h1>
                        </div>
                    </div>
                </div>
                {/* Ganancia */}
                <div>
                    <div className='grid grid-cols-4'>
                        <div className='border border-black'>
                            <h1>Ganancia</h1>
                            <h1>Ventas + Reparaciones - Costo Mercaderia Vendida (CMV) </h1>
                            <h1>{(-Number(categoriesDicc.CMV)*dolar) - Number(categoriesDicc.Venta) - Number(categoriesDicc.Reparaciones)}</h1>
                        </div>
                    </div>
                </div>
                {/* Repuestos */}
                <div>
                    <div className='grid grid-cols-4'>
                        <div className='border border-black'>
                            <h1>Repuestos (USD)</h1>
                            <h1>{categoriesDicc.Repuestos}</h1>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Resumen