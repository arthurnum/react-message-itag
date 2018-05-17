const cheerio = require('cheerio');
const syncHttpsGet = require('./syncHttpsGet')

class Og {
  constructor(tags) {
    this.tags = tags
    this.init()
  }

  init() {
    let titleTag = tags.find(tag => tag.property == 'og:title')
    let descriptionTag = tags.find(tag => tag.property == 'og:description')
    let imageTag = tags.find(tag => tag.property == 'og:image')

    this.title = titleTag && titleTag.content
    this.description = descriptionTag && descriptionTag.content
    this.image = imageTag && imageTag.content
  }
}


async function loadOgSources(urls, parseDataAndCreateOg) {
  while (url = urls.pop()) {
    await parseDataAndCreateOg(await syncHttpsGet(url))
  }
}

function parseOg(data) {
  let html = cheerio.load(data);
  tags = html('meta[property^="og:"]').toArray().map(tag => {return tag.attribs});
  return new Og(tags)
}

function getForItem(item, urls) {
  return loadOgSources(urls, data => {
    let ogObj = parseOg(data)
    console.log('Before Create Og')
    return item.createOg({
      title: ogObj.title,
      description: ogObj.description,
      image: ogObj.image,
    })
  })
}

const og = { getForItem }
module.exports = og
