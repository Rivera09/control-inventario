import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {Button} from '@material-ui/core/Button';

const Icons = () => {
    return( 
        
     <div>

        <div className="boton"> 
          <button title="Productos" onClick={}>
              <div className="icono">
                 <FontAwesomeIcon icon={faClipboardList}/>
              </div>
            </button>
        </div>

        <div className="boton2"> 
          <button title="Ventas y Cotizaciones" onClick={}>
              <div className="icono2">
                 <FontAwesomeIcon icon={faCartArrowDown}/>
               </div>
            </button>
        </div>

        <div className="boton3"> 
            <button title="Facturas" onClick={}>
              <div className="icono3">
                 <FontAwesomeIcon icon={faFileAlt}/>
              </div>
            </button>
        </div>

        <div className="boton4"> 
            <button title="Personal" onClick={}>
                <div className="icono4">
                  <FontAwesomeIcon icon={faUserCheck}/>
                </div>
            </button>
        </div>

        <div className="boton5"> 
            <button title="Reportes"> onClick={}
              <div className="icono5">
                 <FontAwesomeIcon icon={faDownload}/>
                </div>  
            </button>
        </div>

        <div className="boton6"> 
            <button title="Clientes"onClick={}>
               <div className="icono6">
                  <FontAwesomeIcon icon={faUserFriends}/>
                </div>  
            </button>
        </div>

        <div className="boton7"> 
            <button onClick={}>
                Configuracion 
            </button>
        </div>

        <div className="boton8"> 
            <button onClick={}>
                Cerrar Sesion
            </button>
        </div>
     </div>
    );
 };
 
 export default Icons;