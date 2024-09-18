const authorization = (token: string | null) => {
  return {
    headers: {
      Authorization: `${token}`,
    },
    withCredentials: true,
  };
};

export default authorization;
