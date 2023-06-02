import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MainNavBar from '../orders/MainNavBar';

function Statistics() {

    const [movements, setMovements] = useState([])
    const [movname, setMovname] = useState([])
    const [dolar, setDolar] = useState(500)

    const [movimientos, setMovimientos] = useState([]);
    const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            await axios.get(`https://api.bluelytics.com.ar/v2/latest`)
                .then(response => {
                    setDolar(response.data.blue.value_sell)
                })
                .catch(error => {
                    console.error(error)
                })

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
            <div className="bg-white my-2 py-8 px-2 max-w-6xl mx-auto">
              <div>
                <h1 className="text-xl font-bold">Información principal</h1>
                <table className="mt-4 w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Fecha (dd/mm/yy)</th>
                      <th className="px-4 py-2">Ingreso</th>
                      <th className="px-4 py-2">Operación</th>
                      <th className="px-4 py-2">Egreso</th>
                      <th className="px-4 py-2">Monto</th>
                      <th className="px-4 py-2">Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movname.map((row) => (
                      <React.Fragment key={row.idmovname}>
                        <tr
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => handleRowClick(row.idmovname)}
                        >
                          <td className="px-4 py-2">{row.fecha}</td>
                          <td className="px-4 py-2">{row.ingreso}</td>
                          <td className="px-4 py-2">{row.operacion}</td>
                          <td className="px-4 py-2">{row.egreso}</td>
                          <td className="px-4 py-2">{row.monto}</td>
                          <td className="px-4 py-2">{row.username}</td>
                        </tr>
                        {/* Renderiza la tabla de movimientos si el movimiento está seleccionado */}
                        {movimientoSeleccionado === row.idmovname && (
                          <tr>
                            <td colSpan="6">
                              <table className="mt-2 w-full">
                                <thead>
                                  <tr>
                                    <th className="px-4 py-2">Categoría</th>
                                    <th className="px-4 py-2">Cantidad</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {movimientos.map((movimiento) => (
                                    <tr key={movimiento.idmovements}>
                                      <td className="px-4 py-2">{movimiento.categories}</td>
                                      <td className="px-4 py-2">{movimiento.unidades}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
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