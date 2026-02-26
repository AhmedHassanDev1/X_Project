import api from ".";

export const getProfileInfo = async (id: string) => {
  const res = await api.get(`/user/${id}`);
  return res.data;
};

export const getProfileStat = async (id: string) => {
  const res = await api.get(`/user/${id}/stat`);
  return res.data;
};


export const ProfileEdite = async (data: FormData) => {
  const res = await api.put("/user/edite", data, {
    headers: {
      "Content-Type": " multipart/form-data"
    }
  })
  return res.data
}
