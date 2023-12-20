//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs');
const msg = process.argv[2];

run();

async function run() {
	try {
		const kafka = new Kafka({
			clientId: 'smart-lok',
			brokers: ['74.235.96.252:9092'],
		});

		const producer = kafka.producer();
		console.log('Connecting.....');
		await producer.connect();
		console.log('Connected!');
		//A-M 0 , N-Z 1
		// const partition = msg[0] < 'N' ? 0 : 1;
		const result = await producer.send({
			topic: 'sensor-data',
			messages: [
				{
					value: msg,
					// partition: partition,
				},
			],
		});

		console.log(`Send Successfully! ${JSON.stringify(result)}`);
		await producer.disconnect();
	} catch (ex) {
		console.error(`Something bad happened ${ex}`);
	} finally {
		process.exit(0);
	}
}
