const cheerio = require('cheerio');
const syncHttpsGet = require('./syncHttpsGet')

async function loadOgSources(urls, parseDataAndCreateOg) {
  while (url = urls.pop()) {
    await parseDataAndCreateOg(await syncHttpsGet(url))
  }
}

function getForItem(item, urls) {
  return loadOgSources(urls, data => {
    let html = cheerio.load(data);
    tags = html('meta[property^="og:"]').toArray().map(tag => {return tag.attribs});
    let titleTag = tags.find(tag => tag.property == 'og:title')
    let descriptionTag = tags.find(tag => tag.property == 'og:description')
    let imageTag = tags.find(tag => tag.property == 'og:image')
    console.log('Before Create Og')
    return item.createOg({
      title: titleTag && titleTag.content,
      description: descriptionTag && descriptionTag.content,
      image: imageTag && imageTag.content,
    })
  })
}

const og = { getForItem }
module.exports = og
