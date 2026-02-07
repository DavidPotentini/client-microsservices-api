module.exports = (err, req, res, next) => {
  console.error("❌ Erro capturado:", err.message || err);

  // Tratamento específico para erros do Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: "Entrada duplicada",
      details: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: "Erro de validação",
      details: err.errors.map(e => e.message)
    });
  }

  // Erro genérico
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    error: err.message || "Erro interno no servidor"
  });
};
