await queryInterface.addColumn('ingredients', 'category_id', {
  type: Sequelize.INTEGER,
  allowNull: true,
  references: {
    model: 'categories', // nom exact de la table
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});