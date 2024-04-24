export const errorHandler = (code,message)=>{
    const error = new Error();   
    error.message=message;
    error.statuscode = code
    return error;
}