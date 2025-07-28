export function validateName(name) {
  if (!name || name.trim() === '') {
    return 'Name is required.'
  }
  return ''
}

export function validateEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (!email || email.trim() === '') {
    return 'Email is required.'
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.'
  }
  return ''
}

export function validateLoginIdentifier(identifier) {
  if (!identifier || identifier.trim() === '') {
    return 'Email or Username is required.'
  }
  return ''
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required.'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.'
  }
  return ''
}

export function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return 'Passwords do not match.'
  }
  return ''
}
