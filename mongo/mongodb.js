'use strict';
const mongoose = require('mongoose');

mongoose.connect(
   'mongodb://127.0.0.1/riconomia',
   { useNewUrlParser: true },
   err => {
      if (err) console.log(err);
   }
);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Usuario = require('./schemas/usuario');
const Registro = require('./schemas/registro');
const Empresa = require('./schemas/empresa');

let iniciar_DB = () => {
   Usuario.find({}, (err, res) => {
      if (err) console.log(err);
      if (res[0] == undefined) {
         nuevoUsuario({
            nombre: 'Admin',
            nombreEmpresa: 'ripupo S.L.',
            role: 'ADMIN_ROLE',
            correo: 'ripupo88@gmail.com'
         });
      }
   });
};

iniciar_DB();

let nuevoUsuario = objeto_usuario => {
   return new Promise((resolve, reject) => {
      let usuario = new Usuario(objeto_usuario);

      usuario.save((err, res) => {
         if (err) {
            console.log(err);
            reject('Error con la base de datos, posibles datos duplicados');
         }
         resolve(res);
      });
   });
};

let empresasTodas = empleado => {
   return new Promise((resolve, reject) => {
      Registro.find({ fin: false, empleado: empleado.id }, (err, res) => {
         if (err) reject('error al conectar con base de datos');
         resolve(res);
      });
   });
};

let f_nueva_entrada = (entrada, empleado, gps) => {
   return new Promise((resolve, reject) => {
      let registro = new Registro({
         entrada,
         empleado,
         validado: { entrada: gps }
      });

      registro.save((err, res) => {
         if (err) reject(err);
         resolve(res);
      });
   });
};

let f_obten_informe = (empleado, mes) => {
   return new Promise((resolve, reject) => {
      let ahora = new moment(new Date());
      let inicio = new moment('2010-10-01T00:00:00.000Z')
         .year(ahora.year())
         .month(ahora.month() - mes);
      let fin = new moment('2010-10-01T00:00:00.000Z')
         .year(ahora.year())
         .month(ahora.month() - mes + 1);

      Registro.find(
         {
            empleado: empleado.id,
            entrada: {
               $gte: inicio,
               $lt: fin
            }
         },
         (err, res) => {
            if (err) {
               reject(err);
            }

            resolve(res);
         }
      );
   });
};

let f_fin_jornada = horas => {
   return new Promise((resolve, reject) => {
      let jornada = new moment();
      jornada = jornada.hour(jornada.hour() - horas);
      console.log(jornada);
      Registro.find(
         {
            entrada: {
               $lt: jornada
            },
            fin: false
         },
         (err, res) => {
            if (err) {
               reject(err);
            }
            console.log(res);
            resolve(res);
         }
      );
   });
};

let f_obten_admin = id_admin => {
   return new Promise((resolve, reject) => {
      console.log('id_admin', id_admin);
      Usuario.findById(id_admin)
         .populate({
            path: 'empresa',
            model: Empresa,
            populate: { path: 'admin', model: Usuario }
         })
         .exec((err, res) => {
            if (err) reject(err);
            resolve(res);
         });
   });
};

module.exports = {};
