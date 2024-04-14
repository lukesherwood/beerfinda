export default function (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    if (savedPosition) {
      resolve(savedPosition)
    }
    resolve({ x: 0, y: 0 })
  })
}
