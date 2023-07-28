export const orderingTypes = {
  'Name A-Z': 'name',
  'Name Z-A': '-name',
  'Location A-Z': 'location',
  'Location Z-A': '-location',
  'Oldest -> Newest': 'created_on',
  'Newest -> Oldest': '-created_on',
}
export const imageUrl = (brewer) => {
  return isValidImage(brewer?.image_pre_link + brewer?.image)
    ? brewer.image_pre_link + brewer.image
    : 'brewer.jpg'
}

function isValidImage(string) {
  const image = new Image()
  image.onload = function () {
    // image exists and is loaded
    return true
  }
  image.onerror = function () {
    // image did not load
    return false
  }
  image.src = string
}
