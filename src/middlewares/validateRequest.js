

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next();
  };
};