const axios = require('axios')
const cheerio = require('cheerio')
const S3 = require('aws-sdk/clients/s3')

const TWENTY_FOUR_HOURS = (24 * 60 * 60 * 1000)
const binDaysGovPageUrl = 'https://wasteservices.sheffield.gov.uk/property/100051021645';
const s3Client = new S3();

const getBinDataFromS3 = async () => {
  try {
    const existingDataStream = await s3Client.getObject({
      Bucket: 'moistsquid.co.uk',
      Key: 'binDays/data.json'
    }).promise()
    
    const existingData = existingDataStream.Body.toString();
    return { data: JSON.parse(existingData), lastModified: existingDataStream.LastModified }
  } catch (err) {
    console.log(err)
  }
}

const isAfterLastBinDay = (binDays) => {
  const today = (new Date()).getTime();
  const allDateStrings = binDays.reduce((acc, dates) => [...acc, ...dates.nextCollections], [])
  const allDateTimes = allDateStrings.map((dt) => (new Date(dt)).getTime())
  allDateTimes.sort()
  const [earliestDate] = allDateTimes;
  return today - earliestDate > TWENTY_FOUR_HOURS;
}

const fetchAndParseBinDays = async () => {
  const binDayPageHTML = await axios.get(binDaysGovPageUrl)
  const $ = cheerio.load(binDayPageHTML.data, null, false)
  const services = $('.table > tbody:nth-child(2) h4')
  const serviceLabels = services
    .text()
    .split(' Bin')
    .filter((label) => !!label)

  const nextServices = $('.table > tbody:nth-child(2) td.next-service')
    .text()
    .replace(/\t/g,'')
    .replace(/\n/g,'')
    .split('Next Collections')
    .filter((label) => !!label)

  const data = serviceLabels.map((label, idx) => {
    return {
      binColour: label,
      nextCollections: nextServices[idx].split(', '),
    }
  })
  
  return data;
}

const fetchBinDays = async (event) => {
  
  const {data, lastModified} = await getBinDataFromS3()

  const shouldFetchMoreBinData = isAfterLastBinDay(data)
  
  console.log(shouldFetchMoreBinData ? 'Fetching Bin Data!' : 'No need to get more bin data!')
  
  if(shouldFetchMoreBinData) {

    const binDaysData = await fetchAndParseBinDays();
    
    try {
      await s3Client.putObject({
        Bucket: 'moistsquid.co.uk',
        Key: 'binDays/data.json',
        Body: JSON.stringify(binDaysData),
        Metadata: {
          "Content-Type": "applcation/json"
        }
      }).promise()
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = {
  handler: fetchBinDays
}
