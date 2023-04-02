export interface Asesoria{
    id?:Number;
    alumno: {
        id?:Number;
        nombre?:String;
    };
    psicologo: {
        id?:Number;
        nombre?:String;
    };
    fecha?:Date;
    horario: {
        id:number;
        nombre:String;
    };
  }