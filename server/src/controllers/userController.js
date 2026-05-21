// Name exports

export const getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        _id: '920349234ei232492',
        name: 'Mason J. Dubelbeis',
        email: 'mason.dubelbeis@gmail.com',
      },
    },
  });
  next();
};
