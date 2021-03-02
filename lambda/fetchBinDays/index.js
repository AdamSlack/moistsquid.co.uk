const fetchBinDays = () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  } 
}

module.exports = {
  handler: fetchBinDays
}