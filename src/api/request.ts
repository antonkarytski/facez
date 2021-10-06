type RequestProps = {
  url: string;
  method?: "POST" | "GET" | "PUT";
  token?: boolean;
  body?: object | string | number;
  secondAttempt?: boolean;
};

export const request = async <Response = any>({
  url,
  method = "GET",
  body,
  token,
}: RequestProps): Promise<Response> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    const savedToken = "token";
    headers.Authorization = `JWT ${savedToken}`;
  }
  const data: RequestInit = { method, headers };
  if (body) {
    data.body = JSON.stringify(body);
  }
  console.log(url);
  const response = await fetch(url, data);
  if (response.ok) return (await response.json()) as Promise<Response>;
  throw response;
};
