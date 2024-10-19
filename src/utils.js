export async function fetchApi(url, method, body) {
  return await fetch(url, { method: method, headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(body) })
}

export function validate (values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Enter a username'
  }
  else if (values.username.length < 6) {
    errors.username = 'Username is not up to six letters'
  }

  if (!values.email_address) {
    errors.email_address = 'Enter an email address'
  }
  else if (!(/[a-zA-Z0-9_]{2,}[@][a-zA-Z0-9]{2,}[.][a-z]{2,}/.test(values.email_address))) {
    errors.email_address = "Enter a valid email address"
  }

  if (!values.title) {
    errors.title = 'Enter a title'
  }

  if(!values.password){
    errors.password = 'Enter a password'
  }

  if (values.password < 8){
    errors.password = 'Password should be 8 characters or more'
  }

  return errors;
};