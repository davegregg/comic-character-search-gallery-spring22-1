const apiBaseURL = "http://gateway.marvel.com/v1/public"

// NOTE: Example characters with INVALID images: Spider-dok, Blue Marvel, Revanche, Unus
const withValidImages = character => character.thumbnail.path.includes("image_not_available") === false
    && character.thumbnail.path.includes("4c002e0305708") === false  // 4c002e0305708.gif is an "image not found" thumbnail


function searchMarvelCharacters (searchTerm) {
    const url = buildURL(searchTerm)  // A lot of APIs make you build a complicated URL, so it is often nice to have a dedicated function to build it all together.
    fetch(url)
        .then(response => response.json())
        .then(body => {
            console.log(body)  // Here is our data!
            const matchedCharacters = body.data.results
            const charactersWithImages = matchedCharacters.filter(withValidImages)

            renderGalleryView(charactersWithImages, galleryElement)
        })
}


function buildURL (searchTerm) {
    const privateKey = "ae2d0ea904b0dab43c426401467307d66e4e3d03" // Don't hardcode a private key unless you're okay with people taking advantage of your API access.
    const publicKey = "6dd581e143d4eb3659beaa6938688fbe"
    const timestamp = Date.now()
    
    const params = new URLSearchParams({
        ts: timestamp,
        apikey: publicKey,
        hash: md5(timestamp + privateKey + publicKey),
        nameStartsWith: searchTerm,
        limit: 100,
    })

    const endpoint = `${apiBaseURL}/characters`  // Notice the question mark to start the query parameters.
    const url = endpoint + "?" + params

    return url  // Looks like: http://gateway.marvel.com/v1/public/characters?ts=XXXX&apikey=XXXX...
}