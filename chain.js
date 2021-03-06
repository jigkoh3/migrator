const csvFilePath = './ONE_DB/NER/Cisco/list_chain_NER.csv'
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
    // console.log(mirateData);
    const migrator = await prisma.raw_list_chain.createMany({data:mirateData});
};

main();

