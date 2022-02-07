import { Sequelize } from 'sequelize'

const db = new Sequelize('curso-node-f', 'root', 'Mypoopsql.co!', {
  host:'localhost',
  dialect:'mysql',
  //logging: false
});

export default db;