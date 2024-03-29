const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id used is malformed' }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpiredError: res =>
    res.status(401).json({ error: 'token expired' }),

  UnauthorizedError: (res, { message }) =>
    res.status(401).json({ error: message }),

  DuplicateKey: (res, error) =>
    res.status(409).json(error),

  defaultError: (res, error) => {
    console.error(error.name)
    res.status(500).end()
  }
}

const handleErrors = (error, request, response, next) => {
  console.error(error)
  const handler =
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}

export { handleErrors }
