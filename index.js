let cuidades = [
   {
      comunidad: 'Madrid',
      pais: 'España',
      habitantes: 6640705,
      salarioMedioAlAño: 23506,
      educacion: 7.5,
      PIBenMillones: 230795,
      PIBpercapita: 38500,
      zonas: {
         centro: 3320352,
         ciudad: 1660176,
         alrededores: 830088,
         afueras: 415044,
         campo: 207522
      },
      empresas: {
         tiendas: {
            cantidad: 55,
            productos: {
               alimentos: 55
            }
         }
      },
      productos: [
         {
            nombre: 'pan',
            necesidad: 80,
            preciobase: 0.6,
            precioLocal: 2.28,
            determina: {
               precio: 60,
               calidad: 40,
               marca: 0
            },
            materiaPrima: ['arina', 'aceite'],
            almacenPorMetro: 100
         }
      ]
   }
];

let jugadores = {
   id: 1,
   tipo: 'real', //bot
   nombre: 'Richar',
   Efectivo: 10000000 // implementar cuentas por pagar, cuentas por cobrar, ETC
};

let empresas = [
   {
      propiedad: 1,
      tipo: 'tienda',
      nombre: 'panaderia Juan',
      ciudad: 'Madrid',
      zona: 3, // del 1 al 5
      fama: 85, //clientes potenciales = 5% poblacion de zona y luego de ese porcentaje el % de fama
      clientesPotenciales: 35279, //clientes reales seran entre un 8 y un 12% de estos
      capacidadClientesDia: 1000, //metros cuadrados o empleados
      tamañoMetrosCuadrados: 500, //[100, 100000], la capacidad es esto *2
      almacenTamaño: 100,
      empleados: {
         necesarios: 3, //cada trabajador puede atender 300 clientes
         actuales: 5,
         salarioMes: 1200,
         nivel: 8,
         eficiencia: 7.5,
         carga: 85, //se calcula clientes al dia. una carga muy alta afecta la moral
         felicidad: 85 //depende del salrio y la carga de trabajo
      },
      gastosFijos: {
         energia: 5000,
         alquiler: 14000
      },

      productos: [
         {
            nombre: 'pan',
            necesidad: 80,
            almacen: 1000000,
            conMarca: false,
            marca: 25, //de 100
            calidad: 6, //de 10
            precioCoste: 0.5,
            precioVenta: 1.8, // 4,
            precioLocal: 2.28, // 2.28,
            determina: {
               precio: 40,
               calidad: 30,
               marca: 30
            },
            pedidos: {
               recurrente: false,
               cantidad: 100,
               precio: 0.5
            }
         }
      ],

      informesDiarios: [
         {
            dia: 1,
            ventas: [
               {
                  producto: 'pan',
                  precioVenta: 5,
                  precioCosto: 0.5,
                  ventas: 600,
                  gananciaNeta: 1200,
                  costeMercancia: 300,
                  ganancia: 900
               },
               {
                  producto: 'carne',
                  precioVenta: 6,
                  precioCosto: 1.5,
                  ventas: 130,
                  gananciaNeta: 780,
                  costeMercancia: 195,
                  ganancia: 585
               }
            ]
         }
      ]
   }
];

let calculaDia = () => {
   ventasEmpresasClientes();
};

function ventasEmpresasClientes() {
   let numRandom = Math.random();
   empresas.forEach(empresa => {
      let visitasDia = calculaVisitas(numRandom, empresa);
      empresa.productos.forEach(producto => {
         calculaVentas(producto, visitasDia, numRandom);
      });
      console.log(visitasDia);
   });
}

function calculaVentas(producto, visitasDia, numRandom) {
   if (producto.almacen > 0) {
      let necesidad = calculaNecesidad(producto);

      let ventasDia = Math.floor(
         (visitasDia / 100) *
            (numRandom * (0.1 * necesidad) + necesidad - 0.05 * necesidad)
      );
      if (ventasDia < 0) ventasDia = 0;

      if (producto.almacen < ventasDia) {
         ventasDia = producto.almacen;
         producto.almacen = 0;
      } else {
         producto.almacen = producto.almacen - ventasDia;
      }
      console.log('ventas', ventasDia);
      console.log('almacen', producto.almacen);
   }
}

function calculaNecesidad(producto) {
   let necePorPrecio = (porPrecio(producto) / 100) * producto.determina.precio;
   console.log('necePorPrecio', necePorPrecio);
   let necePorCalidad =
      ((producto.calidad * 20) / 100 - 1) * producto.determina.calidad;
   console.log('necePorCalidad', necePorCalidad);
   let necePorMarca =
      ((producto.marca * 2) / 100 - 1) * producto.determina.marca;
   console.log('necePorMarca', necePorMarca);

   let nece =
      ((necePorCalidad + necePorMarca + necePorPrecio) / 100) *
      producto.necesidad;
   nece = producto.necesidad + nece;
   console.log('nece', nece);
   return nece;
}

function porPrecio(producto) {
   let porcent =
      ((producto.precioLocal - producto.precioVenta) * 100) /
      producto.precioLocal;

   return porcent;
}

function calculaVisitas(numRandom, empresa) {
   return Math.floor((empresa.clientesPotenciales / 100) * (numRandom * 4 + 8));
}

setInterval(() => {
   calculaDia();
   //    if (empresas[0].productos[0].precioVenta > 0)
   //       empresas[0].productos[0].precioVenta -= 0.5;
   console.log(empresas[0].productos[0].precioVenta);
}, 1000);
