const User = require('./users');
const Comment = require('./comment');
const Visit = require('./visit');
const Wish = require('./wish');
const Park = require('./park');

// comment relationships
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Park.hasMany(Comment, {
    foreignKey: 'park_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(Park, {
    foreignKey: 'park_id'
})

// wishlist relationships
User.belongsToMany(Park, {
    foreignKey: 'user_id',
    through: Wish,
    as: "wishlist",
    onDelete: 'CASCADE'
})

Park.belongsToMany(User, {
    foreignKey: 'park_id',
    through: Wish,
    as: "wishlist",

})

// visit relationships
User.belongsToMany(Park, {
    foreignKey: 'user_id',
    through: Visit,
    as: "visited",
    onDelete: 'CASCADE'
})

Park.belongsToMany(User, {
    foreignKey: 'park_id',
    through: Visit,
    as: "visited"
})

module.exports = { User, Comment, Visit, Wish, Park };
