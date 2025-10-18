export const capitalize = (str?: string) => {
  if (!!str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } else {
    return str
  }
}

export const getRange = (num1?: number, num2?: number) => {
  if (!!!num1 || !!!num2) {
    return `${num1 || num2 || 0}`
  } else if (num1 === num2) {
    return `${num1}`
  } else if (num1 < num2) {
    return `${num1} - ${num2}`
  } else {
    return `${num2} - ${num1}`
  }
}