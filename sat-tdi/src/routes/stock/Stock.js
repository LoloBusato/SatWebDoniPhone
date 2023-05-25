import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function StockForm() {
  const [proveedores, setProveedores] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [stock, setStock] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {    
    const fetchData = async () => {
      
      await axios.get('http://localhost:3001/supplier')
      .then(response => {
        setProveedores(response.data);
      })
      .catch(error => {
        console.error(error);
        // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
      });

      await axios.get('http://localhost:3001/stock/item')
      .then(response => {
        setRepuestos(response.data);
      })
      .catch(error => {
        console.error(error);
        // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
      });


      await axios.get('http://localhost:3001/stock')
        .then(response => {
          console.log(response.data)
          setStock(response.data);
        })
        .catch(error => {
          console.error(error);
          // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
        });
  }
  fetchData()

  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const stockData = {
      repuesto_nombre: formData.get('repuesto_nombre'),
      cantidad: formData.get('cantidad'),
      precio_compra: formData.get('precio_compra'),
      fecha_compra: formData.get('fecha_ingreso'),
      proveedor_nombre: formData.get('proveedor_nombre'),
    };

    axios.get(`http://localhost:3001/supplier/${stockData.proveedor_nombre}`)
      .then(response => {
        const proveedorId = response.data;
        stockData.proveedor_id = proveedorId;

        axios.get(`http://localhost:3001/stock/item/${stockData.repuesto_nombre}`)
          .then(info => {
            const repuestoId = info.data;
            stockData.repuesto_id = repuestoId;

            axios.post('http://localhost:3001/stock', stockData)
              .then(response => {
                alert("Stock agregado correctamente")
                window.location.reload();
                // Aquí puedes hacer algo con la respuesta del backend, como mostrar un mensaje de éxito al usuario
                })
              .catch(error => {
                console.error(error);
                // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
                });
        })

      })
      .catch(error => {
        console.error(error);
        // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
      });
  }

  const eliminarElemento = async (id) => {
    try {        
        await axios.delete(`http://localhost:3001/stock/${id}`)
        alert("Stock eliminado correctamente")
        window.location.reload();
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div className='min-h-screen'>
      <NavBar />
      <h1 className="flex justify-center text-5xl">Agregar stock</h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label htmlFor="input" className='block text-gray-700 font-bold mb-2'>
            Repuesto:
          </label>
          <div className='relative'>
            <select name="repuesto_nombre" className="mt-1 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline">
              {repuestos.map((repuesto) => (
                <option key={repuesto.idrepuestos} value={repuesto.repuesto}>{repuesto.repuesto}</option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M10 12a2 2 0 100-4 2 2 0 000 4z'/></svg>
            </div>
          </div>
          <button className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => { navigate(`/items`) }} >
              Agregar productos
          </button>
        </div>
        <div className='mb-4'>
          <label htmlFor="cantidad" className='block text-gray-700 font-bold mb-2'>
            Cantidad:
          </label>
          <input type="number" name="cantidad" className="mt-1 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className='mb-4'>
          <label htmlFor="precio_compra" className='block text-gray-700 font-bold mb-2'>
            Precio de compra (USD):
          </label>
          <input type="number" name="precio_compra" className="mt-1 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className='mb-4'>
          <label htmlFor="proveedor_nombre" className='block text-gray-700 font-bold mb-2'>
            Proveedor:
          </label>
          <div className='relative'>
            <select name="proveedor_nombre" className="mt-1 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline">
              {proveedores.map(proveedor => (
                <option key={proveedor.idproveedores} value={proveedor.nombre}>{proveedor.nombre}</option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M10 12a2 2 0 100-4 2 2 0 000 4z'/></svg>
            </div>
          </div>
          <button className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => { navigate(`/supplier`) }} >
              Agregar/ver proveedores
          </button>
        </div>
        <div className='mb-4'>
          <label htmlFor="fecha_ingreso" className='block text-gray-700 font-bold mb-2'>
            Fecha de compra:
          </label>
          <input type="date" name="fecha_ingreso" className="mt-1 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className='flex items-center justify-center px-10'>
          <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Guardar
          </button>
        </div>
      </form>
      <div className="flex justify-center mb-10">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Repuesto</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Proveedor</th>
              <th className="px-4 py-2">Fecha (aaaa/mm/dd)</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(stock => (
              <tr key={stock.idstock}>
                <td className="border px-4 py-2" value={stock.repuesto}>{stock.repuesto}</td>
                <td className="border px-4 py-2" value={stock.cantidad}>{stock.cantidad}</td>
                <td className="border px-4 py-2" value={stock.precio_compra}>{stock.precio_compra} USD</td>
                <td className="border px-4 py-2" value={stock.nombre}>{stock.nombre}</td>
                <td className="border px-4 py-2" value={stock.fecha_compra}>{stock.fecha_compra.slice(0, 10)}</td>
                <td>
                  <button className="bg-red-500 border px-4 py-2 color" onClick={() => eliminarElemento(stock.idstock)}>Eliminar</button>
                </td>
                <td>
                  <button className="bg-green-500 border px-4 py-2 color"
                  onClick={() => { navigate(`/updateStock/${stock.idstock}`) }} >
                      Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockForm;