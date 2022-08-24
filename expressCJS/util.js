module.eports = function handleError(response, error) {
  response.statusCode = 400;
  response.send(error.details.map((details) => details.message).join('. '));
};
