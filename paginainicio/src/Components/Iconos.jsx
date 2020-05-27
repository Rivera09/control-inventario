import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';

const Icons = () => {
    return( 
        
     <div>

        <div className="boton"> 
          <button className="btn" title="Productos" onClick={()=>{alert("Lista de Productos")}}>
              <div className="icono">
                 <FontAwesomeIcon icon={faClipboardList}/>
              </div>
            </button>
        </div>

        <div className="boton2"> 
          <button className="btn" title="Ventas y Cotizaciones" onClick={()=>{alert("Inventario de ventas y cotizaciones realizadas")}}>
              <div className="icono2">
                 <FontAwesomeIcon icon={faCartArrowDown}/>
               </div>
            </button>
        </div>

        <div className="boton3"> 
            <button className="btn" title="Facturas" onClick={()=>{alert("Lista de Facturas de")}}>
              <div className="icono3">
                 <FontAwesomeIcon icon={faFileAlt}/>
              </div>
            </button>
        </div>

        <div className="boton4"> 
            <button className="btn" title="Personal" onClick={()=>{alert("Personal del inventario")}}>
                <div className="icono4">
                  <FontAwesomeIcon icon={faUserCheck}/>
                </div>
            </button>
        </div>

        <div className="boton5"> 
            <button className="btn" title="Reportes" onClick={()=>{alert("Reportes de los inventarios")}}>
              <div className="icono5">
                 <FontAwesomeIcon icon={faDownload}/>
                </div>  
            </button>
        </div>

        <div className="boton6"> 
            <button className="btn" title="Clientes" onClick={()=>{alert("Lista de clientes")}}>
               <div className="icono6">
                  <FontAwesomeIcon icon={faUserFriends}/>
                </div>  
            </button>
        </div>

        <div className="boton7"> 
            <button className=" btn2" onClick={()=>{alert("Realizar configuraciones")}}>
                Configuracion 
            </button>
        </div>

        <div className="boton8"> 
            <button className=" btn2" onClick={()=>{alert("Cerrando Sesion")}}>
                Cerrar Sesion
            </button>
        </div>
     </div>
    );
    
 };
 
 export default Icons;