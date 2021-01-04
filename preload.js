const SerialPort = require('serialport');
const { contextBridge } = require("electron");

// port instance 
let port = new SerialPort("COM5", {
    baudRate: 9600,
    autoOpen: false,
})

// initilzing parser
const Readline = SerialPort.parsers.Readline;
const parser = new Readline({ delimiter: '\r' });
port.pipe(parser);

// building SerialAPI
contextBridge.exposeInMainWorld(
    "SerialAPI", {
        selectAvailablePorts: (callback) => {
            let portList = [];

            SerialPort.list()
                .then((ports) => {
                    ports.forEach(({ path }) => {
                        portList.push(path);
                    });
                })
                .then(() => {
                    callback(portList);
                })

            return ;
        },
        read: (callback) => {
            // removing the last two char 
            // then passing data to callback
            parser.on('data', (data) => 
                callback(data.slice(0, data.length - 1))
            );
        },
        send: (message) => {
            // add delimiter to message to send
            port.write(message + '\r');
        },
        open: (callback) => {
            if(port.isOpen) {
                return ;
            }

            port.open((err) => {
                callback(err);
            });
        },
        close: (callback) => {
            if(port.isOpen) {
                port.close((err) => {
                    callback(err);
                });
            }
        },
        changePortName: (newPortName) => {
            // initilize a new instance of port
            const callback = () => {
                port = new SerialPort(newPortName, {
                    baudRate: 9600,
                    autoOpen: false
                });

                port.pipe(parser);
            }

            if(port.isOpen) {
                port.close(() => {
                    callback();
                });
            }
            else {
                callback();
            }
        },
    }
)