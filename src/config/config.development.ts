export default {
  // jwt sign secret
  jwt: {
    secret: process.env.JWT_SECRET || 'jimmyWang',
    expiresIn: '24h',
  },
  mongodb: {
    connection: 'mongodb://localhost/reserve',
  },
  aeskey: {
    key: 'jimmyWang',
    iv: 'El7Y3w2yPwbbAFvvZLLDzA==',
  },
};
