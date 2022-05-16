import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter, NavLink} from 'reactstrap';



function App() {

  const dataTask = [
    { id: 1, nombre: "Despertar", minutos: 25 },
    { id: 2, nombre: "Desayunar", minutos: 30 },
    { id: 3, nombre: "Prender la computadora", minutos: 5 },
    { id: 4, nombre: "Chequear las noticias", minutos: 15 },
    { id: 5, nombre: "Continuar con el proyecto", minutos: 45 },
    { id: 6, nombre: "Reunirse con el equipo", minutos: 45 },
    { id: 7, nombre: "Descansar", minutos: 35 },
    { id: 8, nombre: "Almorzar", minutos: 40 },
    { id: 9, nombre: "Reunión con el gerente", minutos: 45 },
    { id: 10, nombre: "Alimentar a la mascota", minutos: 20 },
  ];

  const [data, setData] = useState(dataTask);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [taskSeleccionado, setTaskSeleccionado] = useState({
    id: '',
    nombre: '',
    minutos: ''
  });

  const seleccionarTask=(elemento, caso)=>{
setTaskSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setTaskSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(Task=>{
      if(Task.id===taskSeleccionado.id){
        Task.minutos=taskSeleccionado.minutos;
        Task.nombre=taskSeleccionado.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(Task=>Task.id!==taskSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setTaskSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=taskSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>User's ToDo List</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Duration (min)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.minutos}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarTask(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarTask(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Tarea</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={taskSeleccionado && taskSeleccionado.id}
            />
            <br />

            <label>Task</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={taskSeleccionado && taskSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Minutos</label>
            <input
              className="form-control"
              type="text"
              name="minutos"
              value={taskSeleccionado && taskSeleccionado.minutos}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar la tarea {taskSeleccionado && taskSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar tarea</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Tarea</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={taskSeleccionado ? taskSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Minutos</label>
            <input
              className="form-control"
              type="text"
              name="minutos"
              value={taskSeleccionado ? taskSeleccionado.minutos: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
