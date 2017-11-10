exports.port = 8081
exports.ip = process.env.IP || 'localhost'
exports.origin = process.env.ORIGIN || `https://${exports.ip}:${exports.port}`
