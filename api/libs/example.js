// Investigar que es un closure, y un HOC
function procesarError(fn) {
  return function () {
    fn().catch(() => {
      console.log('Error, dentro de procesarError!');
    })
  }
}

function llamadaAsincrona() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(true);
    }, 1000)
  });
}

function x() {
  return llamadaAsincrona()
  .then(() => {
    console.log('La llamada ah terminado!');
  })
}

x()


const functionProtegida = procesarError(x)
functionProtegida()
