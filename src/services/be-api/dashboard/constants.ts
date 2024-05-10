export const GET_ALL_JOBS = (
  page: number,
  perPage: number,
  searchField: string,
  searchQuery: string
) =>
  `/api/jobs?page=${page}&perPage=${perPage}&search%5Bfield%5D=${searchField}&search%5Bquery%5D=${searchQuery} `;
export const GET_JOB_BY_ID = (id: string) => `/api/jobs/${id}`;
