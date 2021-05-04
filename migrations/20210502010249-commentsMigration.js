'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: Sequelize.STRING,
    
    },
    {
      timestamps: false
  });
     
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.dropTable('comments');
     
  }
};
