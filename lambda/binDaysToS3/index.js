const axios = require('axios')
const cheerio = require('cheerio')

const binDaysGovPageUrl = 'https://wasteservices.sheffield.gov.uk/property/100051021645';


const fetchBinDays = async (event) => {

  const binDayPageHTML = await axios.get(binDaysGovPageUrl)
  
  const $ = cheerio.load(binDayPageHTML.data, null, false)
  
  const services = $('.table > tbody:nth-child(2) h4')
  const serviceLabels = services
    .text()
    .split(' Bin')
    .filter((label) => !!label)
  console.log(serviceLabels)

  const nextServices = $('.table > tbody:nth-child(2) td.next-service')
    .text()
    .replace(/\t/g,'')
    .replace(/\n/g,'')
    .split('Next Collections')
    .filter((label) => !!label)
  console.log(nextServices)
  
  const data = serviceLabels.map((label, idx) => {
    return {
      binColour: label,
      nextCollections: nextServices[idx].split(', '),
    }
  })
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  } 
}

module.exports = {
  handler: fetchBinDays
}