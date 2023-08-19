import express from "express";
import cookieParser from "cookie-parser";

const app = express();

//* Ejecutando Middleware de cookies 
app.use(cookieParser());

app.get('/', (req, res) => { 
  res.send("Hello, world! 2");
});

app.get('/setcookie', (req, res) => { 
  //* Creando cookie para que la lea el cliente, se envía aparte de la respuesta de la petición
  //* La cookie como 1er argumento recibe el nombre de la cookie, como 2do es el valor y 3ro un objeto de opciones.
  res.cookie("my cookie name", "my cookie", {
    //* Tiempo en milisegundos de cuando expira la cookie para que no la pueda leer el cliente. 
    maxAge: 7000, 
    //* Otra forma de establecer cuando expira la cookie pasando la fecha como un Date
    // expires: new Date("2022-12-31"),
    //* Por  defecto es false, al establecer true no permitimos que la cookie puede 
    //* ser accedida desde la consola del navegador 
    httpOnly: true,
    //* Habilitamos la cookie para que solo pueda ser leida con https, es importante agregarla en producción 
    secure: true,
    //* Permite restrigir la cookie a que dominio tiene acceso, si se le pasa "strict" el dominio del frontend debe
    //* serigual al dominio del backend, si es "lax" el frontend es un dominio distinto al backend
    sameSite: "lax",
  });
  res.send("Hello, world! 3");
});

app.get('/getcookies', (req, res) => {
  //* Lee como un objeto las cookies creadas tanto en el servidor como en el cliente que hace la peticion
  console.log(req.cookies);
  
  res.send("reading cookies");
});

app.get('/deletecookie', (req, res) => {
  //* Lee como un objeto las cookies creadas tanto en el servidor como en el cliente que hace la peticion
  console.log(req.cookies);
  //* Elimina la cookie del cliente especificando su nombre 
  res.clearCookie('my cookie name')
  res.send("deleting cookies");
});

app.listen(3000);
console.log("Server running on port 3000");