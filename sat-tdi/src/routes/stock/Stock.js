import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MainNavBar from '../orders/MainNavBar';

function StockForm() {
  const [proveedores, setProveedores] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [stock, setStock] = useState([]);

  const [stockCategories, setStockCategories] = useState([])
  const [cajaId, setCajaId] = useState(0)
  const [pesosId, setPesosId] = useState(0)
  const [usdId, setusdId] = useState(0)
  const [mpId, setmpId] = useState(0)
  const [bancoId, setBancoId] = useState(0)

  const [dolar, setDolar] = useState(500)

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

      await axios.get('http://localhost:3001/movcategories')
          .then(response => {
              for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].tipo.includes("Repuestos")) {
                      setStockCategories(prevArray => [...prevArray, response.data[i]])
                  }    
                  if(response.data[i].categories === "Caja") {
                      setCajaId(response.data[i].idmovcategories)
                  } else if(response.data[i].categories === "Pesos") {
                      setPesosId(response.data[i].idmovcategories)
                  } else if(response.data[i].categories === "Dolares") {
                      setusdId(response.data[i].idmovcategories)
                  } else if(response.data[i].categories === "MercadoPago") {
                      setmpId(response.data[i].idmovcategories)
                  } else if(response.data[i].categories === "Banco") {
                      setBancoId(response.data[i].idmovcategories)
                  }                  
              }
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
  }
  fetchData()

  }, []);

  async function handleSubmit(event) {
      event.preventDefault();
      try {
          const userId = JSON.parse(localStorage.getItem("userId"))

          const formData = new FormData(event.target);
          const stockData = {
            repuesto_id: formData.get('repuesto_nombre'),
            cantidad: formData.get('cantidad'),
            precio_compra: formData.get('precio_compra'),
            fecha_compra: formData.get('fecha_ingreso'),
            proveedor_id: formData.get('proveedor_nombre'),
          };

          await axios.post('http://localhost:3001/stock', stockData)
              .then(response => {
                alert("Stock agregado correctamente")
                window.location.reload();
                // Aquí puedes hacer algo con la respuesta del backend, como mostrar un mensaje de éxito al usuario
                })
              .catch(error => {
                console.error(error);
                // Aquí puedes mostrar un mensaje de error al usuario si la solicitud falla
                });

          const valueUsd = parseInt(formData.get('clienteUSD'))
          const valuePesos = parseInt(formData.get('clientePesos'))
          const valueTrans = parseInt(formData.get('clienteBanco'))
          const valueMp = parseInt(formData.get('clienteMercadopago'))
          
          const dolarArr = [valueUsd]
          const pesosArr = [valuePesos, valueTrans, valueMp]

          const montoUSD = dolarArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          const montoPesos = pesosArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          const montoTotal = montoPesos + (montoUSD * dolar)

          const arrayMovements = []

          const gasto = formData.get('gasto')

          const otherValue = document.getElementById("other").value
          const accountValue = document.getElementById("account").value

          if(montoTotal === 0){
              return alert("Ingresar montos")
          } else if(otherValue === "" || accountValue === ""){
              return alert("Seleccionar cajas")
          } else if(gasto.trim() === ""){
              return alert("Ingresar el nombre del gasto")
          }

          const other = JSON.parse(otherValue)
          const account = JSON.parse(accountValue)


          // movname
          await axios.post('http://localhost:3001/movname', {
              ingreso: other.categories, 
              egreso: account.categories, 
              operacion: gasto, 
              monto: montoTotal,
              userId
          })
              .then(response => {
                  const movNameId = response.data.insertId
                  arrayMovements.push([other.idmovcategories, montoTotal, movNameId])
                  //libro
                  if(cajaId === account.idmovcategories) {
                      if (valueUsd !== 0){
                          arrayMovements.push([usdId, -valueUsd, movNameId])
                      }
                      if (valueTrans !== 0){
                          arrayMovements.push([bancoId, -valueTrans, movNameId])
                      }
                      if (valuePesos !== 0){
                          arrayMovements.push([pesosId, -valuePesos, movNameId])
                      }
                      if (valueMp !== 0){
                          arrayMovements.push([mpId, -valueMp, movNameId])
                      }
                  } else {
                      arrayMovements.push([account.idmovcategories, -montoTotal, movNameId])
                  }
              })
              .catch(error => {
                  console.error(error);
              });

          await axios.post('http://localhost:3001/movements', {
              arrayInsert: arrayMovements
          })
              .then(response => {
                  console.log(response)
                  if (response.status === 200){ 
                      alert("Pago agregado")
                      navigate('/movements');
                  } 
              })
              .catch(error => {
                  console.error(error);
              });
    } catch (error) {
      alert(error.response.data);
    } 
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
      <MainNavBar />
      <h1 className="flex justify-center text-5xl">Agregar stock</h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label htmlFor="input" className='block text-gray-700 font-bold mb-2'>
            Repuesto:
          </label>
          <div className='relative'>
            <select name="repuesto_nombre" className="mt-1 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline">
              {repuestos.map((repuesto) => (
                <option key={repuesto.idrepuestos} value={repuesto.idrepuestos}>{repuesto.repuesto}</option>
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
                <option key={proveedor.idproveedores} value={proveedor.idproveedores}>{proveedor.nombre}</option>
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
        <div className=''>
            {/* Valores */}
            <div className='w-full'>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Cuenta: *</label>
                <select name="category" id="category" className='mt-1 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline' >
                    <option value="" disabled selected>Cuenta</option>
                    {stockCategories.map((category) => (
                        <option key={category.idmovcategories} value={category.idmovcategories}>{category.categories}</option>
                    ))}
                </select>
            </div>
            <div className='w-full text-center'>
                <label className="block text-gray-700 font-bold my-2 border-b-2">Monto *</label>
                <div className='flex'>
                    <div className='w-full'>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Pesos:</label>
                        <input 
                            className="mb-2 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            id="pesos" 
                            name='pesos'
                        />
                    </div>     
                    <div className='w-full'>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">USD:</label>
                        <input 
                            className="mb-2 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            id="USD" 
                            name='USD'
                        />
                    </div>    
                    <div className='w-full'>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Banco:</label>
                        <input 
                            className="mb-2 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            id="banco" 
                            name='banco'
                        />
                    </div>
                    <div className='w-full'>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">MercadoPago:</label>
                        <input 
                            className="mb-2 appearance-none w-full px-3 py-2 rounded-md border border-gray-400 shadow-sm leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            id="mercadopago" 
                            name='mercadopago'
                        />
                    </div>                                
                </div>
            </div>
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