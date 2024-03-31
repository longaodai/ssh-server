const {Client} = require('ssh2');
const core = require('@actions/core');

// Create a new SSH client instance
const sshClient = new Client();

// Configure the connection parameters
const connectionParams = {
    host: core.getInput('host'),
    username: core.getInput('username'),
    password: core.getInput('password'),
};
let commands = core.getInput('commands')
sshClient.on('ready', () => {
    console.log('Connected via SSH!');
    execute()
});
sshClient.on('error', (err) => {
    console.error('Error connecting via SSH:', err);
});

function execute() {
    sshClient.exec(commands, (err, stream) => {
        if (err) throw err;
        stream
            .on('close', (code, signal) => {
                console.log('Command execution closed');
                sshClient.end();
            })
            .on('data', (data) => {
                console.log('Command output:', data.toString());
            })
            .stderr.on('data', (data) => {
            console.error('Command error:', data.toString());
        });
    });
}

// Connect to the SSH server
sshClient.connect(connectionParams);



