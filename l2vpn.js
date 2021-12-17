const csvFilePath = './ONE_DB/NER/Cisco/l2vpn_NER.csv'
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
    for (let index = 0; index < mirateData.length; index += 50000) {

        const limit = index < mirateData.length ? 50000 : index - mirateData.length;
        const slideData = mirateData.slice(index, index + limit);
        // console.log(slideData);
        const migrator = await prisma.raw_l2vpn.createMany({ data: mirateData });
        console.log(index)

    }

};

main();

