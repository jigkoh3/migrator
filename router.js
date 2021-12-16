const csvFilePath = './ONE_DB/BKK/Cisco/router_id_BKK.csv'
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
    const migrator = await prisma.raw_router.createMany({data:mirateData});
};

main();

