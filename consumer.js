//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs');

run();
async function run() {
	try {
		const kafka = new Kafka({
			clientId: 'smart-lok',
			brokers: ['74.235.96.252:30092'],
		});

		const consumer = kafka.consumer({ groupId: 'aditya-2' });
		console.log('Connecting.....');
		await consumer.connect();
		console.log('Connected!');

		await consumer.subscribe({
			topic: 'sensor-data',
		});

		await consumer.run({
			eachMessage: async result => {
				console.log('message: ', result.message.value.toString());
			},
		});
	} catch (ex) {
		console.error(`Something bad happened ${ex}`);
	} finally {
	}
}
