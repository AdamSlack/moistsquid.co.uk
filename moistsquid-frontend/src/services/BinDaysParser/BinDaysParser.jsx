// import axios from 'axios';

const testData = [{"binColour":"Black","nextCollections":["3 Mar 2021","17 Mar 2021","31 Mar 2021"]},{"binColour":"Blue","nextCollections":["24 Mar 2021","21 Apr 2021","19 May 2021"]},{"binColour":"Brown","nextCollections":["10 Mar 2021","7 Apr 2021","5 May 2021"]}]

export const fetchBinDays = () => {
  return Promise.resolve(testData)
}

