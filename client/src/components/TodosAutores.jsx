import React, {useEffect, useState}from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TodosAutores = () => 
{
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/autores")
        .then(res => 
            {
            setAutores(res.data);
            })
        .catch(err => console.log(err));
    }, [])

    const borrarAutor = idAutor => 
    {
        axios.delete(`http://localhost:8000/api/autores/`+idAutor)
            .then(res => 
                {
                    let nuevaListaAutores = autores.filter(producto => producto._id !== idAutor);
                    setAutores(nuevaListaAutores);
                })
    }

    return (
        <div>
            <h1>Autores</h1>
            <Link className='btn btn-success' to="/nuevo">Nuevo Autor</Link>
            <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Libros</th>
                    <th>Artículos</th>
                    <th>Novela Gráfica</th>
                    <th>Cuentos</th>
                    <th>Fecha de Creacion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    autores.map((autor,index) => (
                        <tr key ={index}>
                            <td>{autor.nombre}</td>
                            <td><img className='img-fluid' src={autor.imagen} alt=""/></td>
                            <td>
                                {autor.libros ? <span className='glyphicon glyphicon-ok text-success'></span>: <span></span>}
                            </td>
                            <td>{autor.createdAt}</td>
                            <td>
                                <Link className='btn btn-warning' to={`/autor/editar/${autor._id}`}>Editar</Link>
                                <button className='btn btn-danger' onClick={() => borrarAutor(autor._id)}>Borrar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    )
}

export default TodosAutores