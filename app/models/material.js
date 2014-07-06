var mongoose     = require('mongoose');
var Classe       = require('./classe');
var Schema       = mongoose.Schema;

var locais = 'Galeria Armário Jovens Nave'.split(' ');
var estados = 'Quebrado Defeito Funcionando Desconhecido'.split(' ');

var MaterialSchema = new Schema({
	classe: [Classe.ClasseSchema],
	codigo: { type: String, required: true },
	descricao: { type: String, required: true },
	marca: String,
	modelo: String,
	local: { type: String, enum: locais, required: true },
	estado: { type: String, enum: estados, required: true },
	compradoEm: Date,
	tempoGarantia: Number,
	emprestimo: Boolean,
	saida: Boolean,
	doacao: Boolean
});

module.exports = mongoose.model('Material', MaterialSchema);