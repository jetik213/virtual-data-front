export interface Alumno{
    id?:number;
    codigo?:string;
    nombre?:string;
    direccion?:string;
    telefono?:string;
    email?:string;
    carrera: {
        id:number;
        nombre:string;
    };
    ciclo: {
        id:number;
        ciclo:string;
    };
  }