//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs');

run();
async function run() {
	try {
		// establish a tcp connection with the kafka broker
		const kafka = new Kafka({
			clientId: 'smart-lok',
			brokers: ['74.235.96.252:30092'],
		});

		// get the admin interface
		const admin = kafka.admin();
		console.log('Connecting.....');

		// connect to the admin interface
		await admin.connect();
		console.log('Connected!');
		//A-M, N-Z
		await admin.createTopics({
			topics: [
				{
					topic: 'sensor-data',
					numPartitions: 1,
					// numPartitions: 2,
				},
			],
		});
		console.log('Created Successfully!');
		await admin.disconnect();
	} catch (ex) {
		console.error(`Something bad happened ${ex}`);
	} finally {
		process.exit(0);
	}
}
