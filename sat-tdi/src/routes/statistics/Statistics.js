import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MainNavBar from '../orders/MainNavBar';

function Statistics() {

    const [movements, setMovements] = useState([])
    const [movname, setMovname] = useState([])

    const [movimientos, setMovimientos] = useState([]);
    const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {

            await axios.get(`http://localhost:3001/movements`)
                .then(response => {
                    setMovements(response.data)
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
        }
        fetchStates()
    }, []);

    const obtenerMovimientos = (idMovname) => {
      // Realiza una consulta a la base de datos utilizando el idMovname seleccionado
      // y obtén los movimientos relacionados
  
      // En este ejemplo, se filtran los movimientos del array datosMovements
      const movimientosFiltrados = movements.filter(
        (movimiento) => movimiento.movname_id === idMovname
      );
  
      // Actualiza el estado con los nuevos movimientos obtenidos
      setMovimientos(movimientosFiltrados);
    };

    const handleRowClick = (id) => {
      if (movimientoSeleccionado === id) {
        // Si ya se ha seleccionado este movimiento, lo deseleccionamos
        setMovimientoSeleccionado(null);
        setMovimientos([]);
      } else {
        // Obtén los movimientos relacionados al id seleccionado
        obtenerMovimientos(id);
        // Establece el id del movimiento seleccionado
        setMovimientoSeleccionado(id);
      }
    };

    return (
        <div className='bg-gray-300 min-h-screen pb-2'>
            <MainNavBar />
            <div className="bg-white my-2 px-2 max-w-7xl mx-auto">
              <div className='text-center'>
                <h1 className="text-5xl font-bold py-8">Libro contable</h1>
                <table className="mt-4 w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-black">(dd/mm/yy)</th>
                      <th className="px-4 py-2 border border-black">Ingreso</th>
                      <th className="px-4 py-2 border border-black">Operación</th>
                      <th className="px-4 py-2 border border-black">Egreso</th>
                      <th className="px-4 py-2 border border-black">Monto</th>
                      <th className="px-4 py-2 border border-black">Usuario</th>
                      <th className="px-4 py-2 border border-black">Editar</th>
                      <th className="px-4 py-2 border border-black">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {movname.map((row) => (
                      <React.Fragment key={row.idmovname}>
                        <tr
                          className="cursor-pointer hover:bg-gray-100 border border-black"
                          onClick={() => handleRowClick(row.idmovname)}
                        >
                          <td className="px-4 py-2">{row.fecha}</td>
                          <td className="px-4 py-2">{row.ingreso}</td>
                          <td className="px-4 py-2">{row.operacion}</td>
                          <td className="px-4 py-2">{row.egreso}</td>
                          <td className="px-4 py-2">{row.monto}</td>
                          <td className="px-4 py-2">{row.username}</td>
                          <td className="px-4 py-2">
                            <button
                            onClick={() => {navigate('/home')}}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                            >
                              Editar
                            </button>
                          </td>
                          <td className="px-4 py-2">
                            <button
                            onClick={() => {navigate('/home')}}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                        {/* Renderiza la tabla de movimientos si el movimiento está seleccionado */}
                        {movimientoSeleccionado === row.idmovname && (
                          <tr className='bg-gray-300 border border-black'>
                            <td colSpan="3"></td>
                            <td colSpan="3">
                              <table className="my-2 w-full border border-black bg-white">
                                <thead>
                                  <tr>
                                    <th className="px-4 py-2 border border-black">Categoría</th>
                                    <th className="px-4 py-2 border border-black">Cantidad</th>
                                  </tr>
                                </thead>
                                <tbody className='text-center'>
                                  {movimientos.map((movimiento) => (
                                    <tr key={movimiento.idmovements}>
                                      <td className="px-4 py-2 border border-black">{movimiento.categories}</td>
                                      <td className="px-4 py-2 border border-black">{movimiento.unidades}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                            <td colSpan="2"></td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    );
}

export default Statistics