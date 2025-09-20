const parsePdfController = async (req, res) => {
  //@ts-ignore
  const userId = req.auth.userId;

  console.log("Authenticated user ID:", userId);
};
