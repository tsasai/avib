var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tipos = 'Fixo Movel'.split(' ');

var ClasseSchema   = new Schema({
	nome: { type: String, required: true },
	codigo: { type: String, match: /^[A-Z]{2}$/, required: true, uppercase: true },
	tipo: { type: String, enum: tipos, required: true }
});

module.exports = mongoose.model('Classe', ClasseSchema);