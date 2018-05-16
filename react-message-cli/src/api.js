const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const get = (path) =>
  request(path, {
    method: 'GET',
    headers: defaultHeaders
  })

const post = (path, body) =>
  request(path, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body)
  })

const put = (path, body) =>
  request(path, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(body)
  })

const destroy = (path) =>
  request(path, {
    method: 'DELETE',
    headers: defaultHeaders
  })

const request = (path, options) =>
  fetch(path, options)
  .then(res => res.json())


export { get, post, put, destroy }
