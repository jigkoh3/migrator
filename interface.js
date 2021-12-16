const csvFilePath = './ONE_DB/BKK/Cisco/interface_master_BKK.csv'
const csv = require('csvtojson')

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
    const jsonArray = await csv().fromFile(csvFilePath);
    // console.log(jsonArray);
    const mirateData = jsonArray.map(data => {
        delete data.field1;
        return data;
    })
    for (let index = 0; index < mirateData.length; index += 5000) {

        const limit = index < mirateData.length ? 5000 : index - mirateData.length;
        const slideData = mirateData.slice(index, index + limit);
        // console.log(slideData);
        const migrator = await prisma.raw_interface_master.createMany({ data: mirateData });
        console.log(index)

    }

};

main();

