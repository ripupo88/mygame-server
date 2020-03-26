'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresa_schema = new mongoose.Schema({
   nombre: String,
   propiedad: {
      type: Schema.ObjectId,
      ref: 'usuario'
   },
   tipo: {
      type: String,
      enum: ['tienda', 'fabrica']
   },
   zona: {
      type: Number,
      enum: [1, 2, 3, 4, 5]
   },
   fama: Number,
   clientesPotnciales: Number,
   capacidadClientesDia: Number,
   metrosCuadrados: Number,
   almacenMetros: Number,
   empleados: {
      necesarios: Number,
      actuales: Number,
      salarioMes: Number,
      nivel: Number,
      eficacia: Number,
      carga: Number,
      felicidad: Number
   },
   gastosFijos: {
      luz: Number,
      alquiler: Number
   },
   almacen: [
      {
         nombre: String,
         almcenado: Number,
         precioCoste: Number,
         precioVenta: Number,
         calidad: Number,
         pedidos: {
            recurrente: Boolean,
            cantidad: Number,
            precio: Number
         }
      }
   ]
});

module.exports = mongoose.model('empresa', empresa_schema);
