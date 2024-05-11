export const GET_ALL_JOBS = (
  page: number,
  perPage: number,
  searchField: string,
  searchQuery: string
) =>
  `/api/jobs?page=${page}&perPage=${perPage}${
    searchField ? `&search%5Bfield%5D=${searchField}` : ""
  }${searchQuery ? `&search%5Bquery%5D=${searchQuery}` : ""} `;
export const GET_JOB_BY_ID = (id: string) => `/api/jobs/${id}`;
export const POST_APPLY_JOB = (id: string) => `/api/jobs/${id}/apply`;
export const POST_WITHDRAW_JOB = (id: string) => `/api/jobs/${id}/withdraw`;
export const GET_ALL_JOB_WITHOUT_FILTER = `/api/jobs?page=1&perPage=100`;

