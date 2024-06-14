const User = require('./users');
const Comment = require('./comment');
const Visit = require('./visit');
const Wish = require('./wish');

// comment relationships
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

// wishlist relationships
User.hasMany(Wish, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Wish.belongsTo(User, {
    foreignKey: 'user_id'
})

// visit relationships
User.hasMany(Visit, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Visit.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Comment, Visit, Wish };
