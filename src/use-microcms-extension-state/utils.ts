export const descriptionParser = <T>(data: T): string => {
  switch (typeof data) {
    case 'undefined':
      return 'ăȘă'

    case 'string':
      return data

    case 'number':
      return data.toLocaleString()

    case 'object':
      if (Array.isArray(data)) {
        return data.join(',')
      }
      return JSON.stringify(data)

    default:
      return 'ăă'
  }
}
